//IMPORTS
const express = require('express');
const mongoose = require('mongoose')
const https = require('https');
const app = express();
const cors = require('cors');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const expressSession = require('express-session')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser');
const User = require('./user')
const strategy = require('./passportConfig')

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

passport.use(
    new localStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            //Database error
            if (err) throw done(err);
            if (!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) throw err;
                if (res === true) {
                    return done(null, user)
                }
                else done(null, false)
            })
        })
    })
)
passport.serializeUser((user, callback) => {
    callback(null, user.id)
});
passport.deserializeUser((id, callback) => {
    User.findOne({_id: id}, (err, user) => {
        callback(err, user)
    })
})

app.use(cookieParser("itsasecret"))
app.use(passport.initialize())
app.use(passport.session())



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
    console.log(req.body)
    passport.authenticate("local", function(err, user, info) {
        console.log("in auth")
        if (err) {
            return next(err)}
        if (!user) {
            return res.send("We couldn't authenticate your username or password")
        }
        else {
            req.logIn(user, err => {
                if (err) throw next(err);
                console.log(req.user)
                return res.json(req.user)
            })
        }
    })(req, res, next);
})

app.get("/dashboard/:user", (req, res) => {
    console.log(req.body)
})

app.listen(PORT, function(err) {
    if (err) console.log("error fail")
    console.log("Server listening on Port", PORT)
})