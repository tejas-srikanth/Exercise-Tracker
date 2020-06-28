import React, { useState } from "react";
import axios from "axios";

function ExercisesList(props){
    const [exercises, setExercises] = useState({exercises: []});
    return (
        <div>
            <p>You are on the ExercisesList</p>
        </div>
    )
}

export default ExercisesList