const router = require("express").Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('../config/passport')

router.post("/register", (req, res,) => {
    User.findOne({ username: req.body.username }, async (err, document) => {
        if (document) res.send("Username is already taken.")
        if (!document) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                hihatArray: req.body.hihatArray,
                openHhArray: req.body.openHhArray,
                snareArray: req.body.snareArray,
                kickArray: req.body.kickArray,
                melodyRowOne: req.body.melodyRowOne,
                melodyRowTwo: req.body.melodyRowTwo,
                melodyRowThree: req.body.melodyRowThree,
                melodyRowFour: req.body.melodyRowFour,
                melodyRowFive: req.body.melodyRowFive,
                melodyRowSix: req.body.melodyRowSix,
                melodyRowSeven: req.body.melodyRowSeven,
                melodyRowEight: req.body.melodyRowEight,
                melodyRowNine: req.body.melody2RowNine,
                melody2RowOne: req.body.melody2RowOne,
                melody2RowTwo: req.body.melody2RowTwo,
                melody2RowThree: req.body.melody2RowThree,
                melody2RowFour: req.body.melody2RowFour,
                melody2RowFive: req.body.melody2RowFive,
                melody2RowSix: req.body.melody2RowSix,
                melody2RowSeven: req.body.melody2RowSeven,
                melody2RowEight: req.body.melody2RowEight,
                melody2RowNine: req.body.melody2RowNine,
                bassRowOne: req.body.bassRowOne ,
                bassRowTwo: req.body.bassRowTwo,
                bassRowThree: req.body.bassRowThree,
                bassRowFour: req.body.bassRowFour,
                bassRowFive: req.body.bassRowFive,
                bassRowSix: req.body.bassRowSix,
                bassRowSeven6: req.body.bassRowSeven,
                bassRowEight7: req.body.bassRowEight,
                bassRowNine: req.body.bassRowNine
            });
            await newUser.save()
            res.send(newUser)
        }
    })
    .catch(err => console.error(err))
})

router.post("/login", (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", function (err, user, info) {
        console.log("in auth")
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send("We couldn't authenticate your username or password")
        }
        else {
            req.logIn(user, err => {
                if (err) throw next(err);
                //  res.redirect(`https://localhost:3000/dashboard/${user.username}`)
                res.json(user)
            })
        }
    })(req, res, next);
})

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router