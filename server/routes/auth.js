const express = require('express');
const router = express.Router();
const userQueries = require('../database/queries/users')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/passport');


router.post("/signup", async (req, res, next) => {
  console.log('body', req.body)

  try {
    const passwordDigest = await authHelpers.hashPassword(req.body.password)

    const userInfo = {
      username: req.body.username,
      password: passwordDigest
    }

    let newUser = await userQueries.addNewUser(userInfo)
    res.json({
      payload: newUser,
      msg: "Success adding a new user",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failure adding a new user",
      err: true
    })
  }
})

router.post("/login", passport.authenticate('local'), (req, res, next) => {
  // console.log(req.body)
  res.json({
    payload: req.body.id,
    message: 'login successful',
    err: false
  })
})

router.post("/logout", authHelpers.loginRequired, (req, res, next) => {
  console.log("log outtt")
  req.logout()
  res.json({
    payload: null,
    msg: "User logged out successfully",
    err: false
  })
})

router.get("/isUserLoggedIn", authHelpers.loginRequired, (req, res) => {
  console.log(req.user)
  res.json({
    payload: req.user,
    msg: "User is logged in. Session active",
    err: false
  })
})

module.exports = router;
