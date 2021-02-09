const router = require("express").Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('../../config/passport')


router.post("/", (req, res) => {
    console.log(req.body.hihatArray)
    User.findOneAndUpdate({ username: req.body.username },
        {
            $push: {
                hihatArray: req.body.hihatArray,
                openHhArray: req.body.openHhArray,
                kickArray: req.body.kickArray,
                snareArray: req.body.snareArrayArray,
                melodyRowOne: req.body.melodyRowOne,
                melodyRowTwo: req.body.melodyRowTwo,
                melodyRowThree: req.body.melodyRowThree,
                melodyRowFour: req.body.melodyRowFour,
                melodyRowFive: req.body.melodyRowFive,
                melodyRowSix: req.body.melodyRowSix,
                melodyRowSeven: req.body.melodyRowSeven,
                melodyRowEight: req.body.melodyRowEight,
                melodyRowNine: req.body.melodyRowNine,
                bassRowOne: req.body.bassRowOne,
                bassRowTwo: req.body.bassRowTwo,
                bassRowThree: req.body.bassRowThree,
                bassRowFour: req.body.bassRowFour,
                bassRowFive: req.body.bassRowFive,
                bassRowSix: req.body.bassRowSix,
                bassRowSeven: req.body.bassRowSeven,
                bassRowEight: req.body.bassRowEight,
                bassRowNine: req.body.bassRowNine   
            }
        })
        .then(response => res.json(response))
})


module.exports = router
