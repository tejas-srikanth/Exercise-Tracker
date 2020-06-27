const router = require("express").Router();
let User = require("../models/user.model");

//getting all users
router.route("/")
.get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.json("Error" + err));
});

//adding users
router.route("/add")
.post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username: username });
    newUser.save()
    .then(() => res.json("User successfully added"))
    .catch(err => res.json("Error " + err));
})

module.exports = router;