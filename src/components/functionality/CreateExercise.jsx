import React, { useState } from "react"
import DatePicker from "react-datepicker"
function CreateExercise(props){
    const [exerciseLog, setExerciseLog] = useState({username: "", description: "", duration: 0, date: new Date(), users: []});

    function onChangeField(event){

        const {name, value} = event.target
        setExerciseLog(prevValue => (
            {...prevValue, [name]: value}
        ));
    };

    function onChangeDate(date){
        setExerciseLog(prevValue => (
            {...prevValue, date: date}
        ))
    };

    function onSubmit(event){
        event.preventDefault();

        const exercise = {
            username: exerciseLog.username,
            description: exerciseLog.description,
            duration: Number(exerciseLog.duration),
            date: exerciseLog.date
        }

        console.log(exercise);

        window.location = "/"
        
    }
    

    return (
        <div>
            <h3>Create New Exercise Page</h3>
            <form onSumbit={onSubmit}>

                <div className="form-group">
                    <label>Username: </label>
                    <select required className="form-control" value={exerciseLog.username} onChange={onChangeField} name="username">
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
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
                
            </form>
        </div>
    )
}

export default CreateExercise