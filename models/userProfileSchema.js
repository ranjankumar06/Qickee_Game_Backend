const mongoose = require('mongoose')


const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    avatar: {
        type: String
    },
    coins: {
        type: Number,
        default: 0
    },
    userId: {
        type: String
    },
    score: {
        type: String,
        default: 0
    },
    payPal_Id: {
        type: String
    }


}, { timestamps: true, versionKey: false })
module.exports = mongoose.model('userprofile', profileSchema)  