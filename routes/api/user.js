const router = require("express").Router()
const User = require('../../models/user')

router.get("/", (req, res) => {
    console.log("route hit")
    if (req.user) {
        User.findOne(
            {
                _id: req.user._id
            }
        ).then(user => {
            res.json(user)
            console.log(user)
        })
    }
})


module.exports = router