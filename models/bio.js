const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Biob = new Schema(
    {
        UserId: { type: String, required: true },
        Bio: { type: String, required: true },
    }
)

module.exports = mongoose.model('bio', Biob)