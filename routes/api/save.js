const router = require("express").Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('../../config/passport')


router.post("/", (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.user)
    } else {
        console.log("not logged in")
    }
    
    // console.log(req.body.hihatArray)
    User.findOneAndUpdate({ username: req.body.username },
        {
            $push: {
                hihatArray: req.body.hihatArray,
                openHhArray: req.body.openHhArray,
                kickArray: req.body.kickArray,
                snareArray: req.body.snareArray,
                melodyRowOne: req.body.melodyRowOne,
                melodyRowTwo: req.body.melodyRowTwo,
                melodyRowThree: req.body.melodyRowThree,
                melodyRowFour: req.body.melodyRowFour,
                melodyRowFive: req.body.melodyRowFive,
                melodyRowSix: req.body.melodyRowSix,
                melodyRowSeven: req.body.melodyRowSeven,
                melodyRowEight: req.body.melodyRowEight,
                melodyRowNine: req.body.melodyRowNine,
                melody2RowOne: req.body.melody2RowOne,
                melody2RowTwo: req.body.melody2RowTwo,
                melody2RowThree: req.body.melody2RowThree,
                melody2RowFour: req.body.melody2RowFour,
                melody2RowFive: req.body.melody2RowFive,
                melody2RowSix: req.body.melody2RowSix,
                melody2RowSeven: req.body.melody2RowSeven,
                melody2RowEight: req.body.melody2RowEight,
                melody2RowNine: req.body.melody2RowNine,
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
