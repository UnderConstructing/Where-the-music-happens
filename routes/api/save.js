const router = require("express").Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('../../config/passport')


router.post("/", (req, res) => {
    User.findOneAndUpdate({ username: req.body[0].username },
        {
            $push: {
                hihatArray: req.body[0].hihatArray,
                openHhArray: req.body[0].openHhArray,
                kickArray: req.body[0].kickArray,
                snareArray: req.body[0].snareArrayArray,
                melodyRowOne: req.body[0].melodyRowOne,
                melodyRowTwo: req.body[0].melodyRowTwo,
                melodyRowThree: req.body[0].melodyRowThree,
                melodyRowFour: req.body[0].melodyRowFour,
                melodyRowFive: req.body[0].melodyRowFive,
                melodyRowSix: req.body[0].melodyRowSix,
                melodyRowSeven: req.body[0].melodyRowSeven,
                melodyRowEight: req.body[0].melodyRowEight,
                melodyRowNine: req.body[0].melodyRowNine,
                bassRowOne: req.body[0].bassRowOne,
                bassRowTwo: req.body[0].bassRowTwo,
                bassRowThree: req.body[0].bassRowThree,
                bassRowFour: req.body[0].bassRowFour,
                bassRowFive: req.body[0].bassRowFive,
                bassRowSix: req.body[0].bassRowSix,
                bassRowSeven: req.body[0].bassRowSeven,
                bassRowEight: req.body[0].bassRowEight,
                bassRowNine: req.body[0].bassRowNine,
            }
        })
        .then(response => console.log(response))
})


module.exports = router
