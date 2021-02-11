const router = require("express").Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('../../config/passport')


router.post("/", (req, res) => {
    console.log(req.body.username)
    User.findOneAndUpdate({ username: req.body.username },
        {
            $push: {
                author: req.body.author,
                receivedhihatArray: req.body.hihatArray,
                receivedopenHhArray: req.body.openHhArray,
                receivedkickArray: req.body.kickArray,
                receivedsnareArray: req.body.snareArray,
                receivedmelodyRowOne: req.body.melodyRowOne,
                receivedmelodyRowTwo: req.body.melodyRowTwo,
                receivedmelodyRowThree: req.body.melodyRowThree,
                receivedmelodyRowFour: req.body.melodyRowFour,
                receivedmelodyRowFive: req.body.melodyRowFive,
                receivedmelodyRowSix: req.body.melodyRowSix,
                receivedmelodyRowSeven: req.body.melodyRowSeven,
                receivedmelodyRowEight: req.body.melodyRowEight,
                receivedmelodyRowNine: req.body.melodyRowNine,
                receivedmelody2RowOne: req.body.melody2RowOne,
                receivedmelody2RowTwo: req.body.melody2RowTwo,
                receivedmelody2RowThree: req.body.melody2RowThree,
                receivedmelody2RowFour: req.body.melody2RowFour,
                receivedmelody2RowFive: req.body.melody2RowFive,
                receivedmelody2RowSix: req.body.melody2RowSix,
                receivedmelody2RowSeven: req.body.melody2RowSeven,
                receivedmelody2RowEight: req.body.melody2RowEight,
                receivedmelody2RowNine: req.body.melody2RowNine,
                receivedbassRowOne: req.body.bassRowOne,
                receivedbassRowTwo: req.body.bassRowTwo,
                receivedbassRowThree: req.body.bassRowThree,
                receivedbassRowFour: req.body.bassRowFour,
                receivedbassRowFive: req.body.bassRowFive,
                receivedbassRowSix: req.body.bassRowSix,
                receivedbassRowSeven: req.body.bassRowSeven,
                receivedbassRowEight: req.body.bassRowEight,
                receivedbassRowNine: req.body.bassRowNine   
            }
        })
        .then(response => res.json(response))
})


module.exports = router
