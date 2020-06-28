import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import axios from "axios";

function EditExercise(props){
    const [exerciseLog, setExerciseLog] = useState({username: "", description: "", duration: 0, date: new Date(), users: []});
    
    //do this once EditExercise is rendered in the DOM
    useEffect(() => {
        //get the exercise matching the id
        axios.get("http://localhost:5000/exercises/"+props.match.params.id)
        .then(response => {
            console.log(response.data)
            setExerciseLog(prevValue => ({...prevValue,
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            }));
        })
        .catch(err => "Error "+err);
        
        //get all the users for the select tag
        axios.get("http://localhost:5000/users/")
        .then(response => {
            console.log(response.data)
            setExerciseLog(prevValue => (
                {...prevValue, users: response.data.map(user => user.username)}
            ))
        })

    }, []);

    function onChangeField(event){
        const {name, value} = event.target
        setExerciseLog(prevValue => (
            {...prevValue, [name]: value}
        ));
    };

    function onChangeUsername(event){
        const value = event.target.value;
        console.log(value);
        
        setExerciseLog(prevValue => (
            {...prevValue, username: value}
        ))
        console.log(exerciseLog)
    }

    function onChangeDate(date){
        setExerciseLog(prevValue => (
            {...prevValue, date: date}
        ))
    };

    function onSubmit(event){
        event.preventDefault();

        const newExercise = {
            username: exerciseLog.username,
            description: exerciseLog.description,
            duration: Number(exerciseLog.duration),
            date: exerciseLog.date
        }
        
        //update the exercise
        axios.post("http://localhost:5000/exercises/update/"+props.match.params.id, newExercise)
        .then(res => console.log(res.data))

        //redirect to home route
        window.location="/"
    }

    return (
        <div>
            <h3>Create New Exercise Page</h3>
            <form onSumbit={onSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={exerciseLog.username} onChange={onChangeUsername} name="username">
                        { exerciseLog.users.map(user => {
                            return (
                                <option key={user} value={user}>{user}</option>
                            )
                        }) }
                    </select> 
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input required className="form-control" value={exerciseLog.description} onChange={onChangeField} name="description"/>
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input required className="form-control" value={exerciseLog.duration} onChange={onChangeField} name="duration"/>
                </div>
                    
                <div className="form-group">
                    <label>Date</label>
                    <div>
                        <DatePicker selected={exerciseLog.date} onChange={onChangeDate}/>
                    </div>
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" onClick={onSubmit}/>
                </div>
                
            </form>
        </div>
    )
}

export default EditExercise