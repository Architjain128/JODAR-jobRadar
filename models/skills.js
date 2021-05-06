const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Skills = new Schema(
    {
        UserId: { type: String, required: true },
        Spec: { type: String, required: true },
    }
)

module.exports = mongoose.model('skill', Skills)