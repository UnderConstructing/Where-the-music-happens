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
                password: hashedPassword
            });
            await newUser.save()
            res.send("User Registration complete")
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