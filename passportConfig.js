const User = require('./user');
const bcrypt = require('bcrypt')
const localStrategy = require('passport-local').Strategy;


module.exports = function (passport) {
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
}