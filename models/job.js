const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Jobs = new Schema(
    {
        UserId:{ type: String, required: true },
        Company_name:{ type: String, required: true },
        email:{ type: String, required: true },
        Title:{ type: String, required: true },
        Descri:{ type: String, required: true },
        Maxappli:{ type: Number,min:1, required: true },
        Maxposi:{ type: Number,min:1, required: true },
        Deadline:{ type: String, required: true },
        Job_Type:{ type: Number, required: true },
        Job_Dura:{ type: Number, required: true },
        Job_Sal:{ type: Number,min:1, required: true },
        Skill_Req:{ type: String, required: true },
        Rating:{ type: Number, required: true },
        sumRating:{ type: Number, required: true },
        Ondate:{ type: String, required: true },
        Status:{ type: String, required: true, default: "pending" },
    }
)

module.exports = mongoose.model('job', Jobs)