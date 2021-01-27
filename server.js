//IMPORTS
const express = require('express');
const mongoose = require('mongoose')
const https = require('https');
const app = express();
const cors = require('cors');
const passport = require('passport')
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const expressSession = require('express-session')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser');
const User = require('./user')


mongoose.connect('mongodb://localhost:27017/User?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {console.log('mongoosed')})

//MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}))
app.use(expressSession({
    secret: "itsasecret",
    resave: true,
    saveUninitialized: true
}));


app.use(cookieParser("itsasecret"))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')


//ROUTES
app.get('/about/api', (req, res) => {
    console.log(req)
    res.send('hi there fella')
})

app.post("/api/register", (req, res,) => {
    User.findOne({username: req.body.username}, async (err, document) => {
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
    }).catch(err => console.error(err))
})

app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return next(err)}
        if (!user) {
            return res.send("We couldn't authenticate your username or password")
        }
        else {
            user.logIn(user, err => {
                if (err) throw err;
                res.send("You've logged in!")
                console.log(req.user)
            })
        }
    })
})

app.get("/user", (req, res) => {
    console.log(req.body)
})

app.listen(PORT, function(err) {
    if (err) console.log("error fail")
    console.log("Server listening on Port", PORT)
})