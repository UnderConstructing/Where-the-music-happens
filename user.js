const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: String,
    password: String,
    sequences: Array
})

module.exports = mongoose.model("User", user) 