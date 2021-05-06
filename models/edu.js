const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Education = new Schema(
    {
        UserId: { type: String, required: true },
        Edu: { type: String, required: true },
        Edus: { type: String, required: true },
        Edue: { type: String, required: true },
    }
)

module.exports = mongoose.model('edu', Education)