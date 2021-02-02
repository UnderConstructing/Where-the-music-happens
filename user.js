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
    kickArray: [objectArray],
    snareArray: [objectArray],
    melodyRowOne: [objectArray],
    melodyRowTwo: [objectArray],
    melodyRowThree: [objectArray],
    melodyRowFour: [objectArray],
    melodyRowFive: [objectArray],
    melodyRowSix: [objectArray],
    melodyRowSeven: [objectArray],
    melodyRowEight: [objectArray],
    melodyRowNine: [objectArray],
    melodyRowTen: [objectArray],
    bassRowOne: [objectArray],
    bassRowTwo: [objectArray],
    bassRowThree: [objectArray],
    bassRowFour: [objectArray],
    bassRowFive: [objectArray],
    bassRowSix: [objectArray],
    bassRowSeven: [objectArray],
    bassRowEight: [objectArray],
    bassRowNine: [objectArray],
    bassRowTen: [objectArray],
    description: String
})



module.exports = mongoose.model("User", user) 