
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const scoreSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        requierd: true
    },
})

module.exports = scoreSchema