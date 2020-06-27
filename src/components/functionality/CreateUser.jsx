import React, { useState } from "react"
import axios from 'axios';

function CreateUser(){
    const [username, setUsername] = useState({username: ""});

    function onChangeUsername(event){
        const value = event.target.value;

        setUsername({username: value});
    }

    function onSubmit(event){

        event.preventDefault()
        const newUser = {
            username: username.username
        }
        console.log(newUser)
        axios.post("http://localhost:5000/users/add", newUser)
        .then(res => console.log(res.data))

        setUsername({username: ""})

    }

    return (
        <div>
            <h3>Create a new user</h3>
            <form onSubmit = {onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input required className="form-control" value={username.username} onChange={onChangeUsername}></input>
                </div>

                <div className="form-group">
                    <input type="submit" onClick={onSubmit} value="Create Username" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;