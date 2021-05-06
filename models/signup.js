const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Signup = new Schema(
    {
        Firstname: { type: String, required: true },
        Lastname: { type: String, required: true },
        email: { type: String, required: true , unique : true },
        password: { type: String, required: true },
        type: { type: String, required: true },
        company_name:{type: String, required: true },
        contact_number:{type: String, required: true },
        signup_time: { type: String},
        reset_token: { type: Number , required : true, default: 0},  // total  rating
        expire: { type: Number , required : true, default: 0},    // number of pepole rated
        admin:{type: String},
    }
)

module.exports = mongoose.model('signup', Signup)