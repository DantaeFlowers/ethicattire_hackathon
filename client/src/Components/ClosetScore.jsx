import React from 'react';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import '../closetScore.css';


const ClosetScore = (props) => {
    let currentItems = 16;
    let totalItems = 32
    let percentage = (currentItems / totalItems) * 100;
    return (
        <example label="Default" >
            <CircularProgressbar className = 'score' value={percentage} text={`${currentItems}/${totalItems}`} />
        </example>
    )
}
export default ClosetScore;