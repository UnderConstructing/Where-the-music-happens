const mongoose = require('mongoose')

const objectArray = new mongoose.Schema({
    id: Number,
    isActive: Boolean,
    type: String,
    note: String,
    backgroundColor: String
})

const user = new mongoose.Schema({
    username: String,
    password: String,
    hihatArray: [[objectArray]],
    openHhArray: [[objectArray]],
    kickArray: [[objectArray]],
    snareArray: [[objectArray]],
    melodyRowOne: [[objectArray]],
    melodyRowTwo: [[objectArray]],
    melodyRowThree: [[objectArray]],
    melodyRowFour: [[objectArray]],
    melodyRowFive: [[objectArray]],
    melodyRowSix: [[objectArray]],
    melodyRowSeven: [[objectArray]],
    melodyRowEight: [[objectArray]],
    melodyRowNine: [[objectArray]],
    melody2RowOne: [[objectArray]],
    melody2RowTwo: [[objectArray]],
    melody2RowThree: [[objectArray]],
    melody2RowFour: [[objectArray]],
    melody2RowFive: [[objectArray]],
    melody2RowSix: [[objectArray]],
    melody2RowSeven: [[objectArray]],
    melody2RowEight: [[objectArray]],
    melody2RowNine: [[objectArray]],
    bassRowOne: [[objectArray]],
    bassRowTwo: [[objectArray]],
    bassRowThree: [[objectArray]],
    bassRowFour: [[objectArray]],
    bassRowFive: [[objectArray]],
    bassRowSix: [[objectArray]],
    bassRowSeven: [[objectArray]],
    bassRowEight: [[objectArray]],
    bassRowNine: [[objectArray]],
    name: Array,
    author: Array
})



module.exports = mongoose.model("User", user) 