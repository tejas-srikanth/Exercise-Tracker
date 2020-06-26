const router = require("express").Router();
let Exercise = require("../models/exercise.model");

//get all the exercises
router.route("/")
.get((req, res) => {
    Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error "+err));
})

//add an exercise
router.route("/add")
.post((req, res) => {
    const username = req.query.username;
    const description = req.query.description;
    const duration = Number(req.query.duration);
    const date = Date.parse(req.query.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json("successfully saved exercise"))
    .catch((err) => res.status(400).json("Error "+err));

})

//get or delete a specific exercise by id
router.route("/:id")
.get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => { res.json(exercise)}) 
    .catch(err => { res.status(400).json("Error "+err)})

})
.delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Successfully deleted item"))
    .catch(err => res.status(400).json("Error "+err))
})

//update a specific item
router.route("/update/:id")
.post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.query.username;
        exercise.description = req.query.description;
        exercise.duration = Number(req.query.duration)
        exercise.date = Date.parse(req.query.date)

        exercise.save()
        .then(() => res.json("Successfully updated item"))
        .catch(err => res.status(400).json("Error "+err))
    })
})


module.exports = router;