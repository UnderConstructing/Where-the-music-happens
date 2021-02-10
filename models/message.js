const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    message: String,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Message", Message) 