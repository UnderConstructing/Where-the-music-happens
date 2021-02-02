const router = require("express").Router()
const User = require('../../models/user')

router.get("/", (req, res) => {
    if (req.user) {
        User.findOne(
            {
                _id: req.user._id
            }
        ).then(user => {
            console.log(user)
            res.json(user)

        })
    }
})


module.exports = router