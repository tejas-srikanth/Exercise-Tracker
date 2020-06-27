import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./navbar/Navbar"
import CreateExercise from "./functionality/CreateExercise"
import CreateUser from "./functionality/CreateUser"
import EditExercise from "./functionality/EditExercise"
import ExercisesList from "./functionality/ExercisesList"


function App() {
  return (
    <Router>
      <div className="container">

        <Navbar />
        <br />
        <Route exact path="/" component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  )

}

export default App;
