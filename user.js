const mongoose = require('mongoose')
const user = new mongoose.Schema({
    username: String,
    password: String,
    sequences: Array,
    description: String,
})

module.exports = mongoose.model("User", user) 