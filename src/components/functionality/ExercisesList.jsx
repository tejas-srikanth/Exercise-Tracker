import React, { useState, useEffect } from "react";
// import useAxios from "axios-hooks";
import axios from "axios";
import Exercise from "./Exercise";

function ExercisesList() {

    let [exercises, setExercises] = useState([])
    
    useEffect( () => {
        axios.get("http://localhost:5000/exercises/")
        .then(res => 
            {
                setExercises(res.data)
            }
        )
    }, [])

    function deleteExercise(id){
        axios.delete("http://localhost:5000/exercises/"+id)
        .then(res => console.log(res.data))

        setExercises(prevValue => (
            prevValue.exercises.filter(exercise => exercise._id !== id)
        ))
    }

    return (
        <div>
        <h3>Exercises List</h3>
        <table className="table">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(ex => {
                    return <Exercise 
                    key={ex._id} 
                    username={ex.username} 
                    description={ex.description} 
                    duration={ex.duration} 
                    date={ex.date} 
                    id={ex._id}
                    deleteExercise={deleteExercise}
                    />
                })}
            </tbody>
        </table>
        </div>
    )
}

export default ExercisesList