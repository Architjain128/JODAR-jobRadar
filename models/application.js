const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Applicationd = new Schema(
    {
        JobId:{ type: String, required: true },
        UserId:{ type: String, required: true },
        juid:{ type: String, required: true,unique:true },
        Company_name:{ type: String, required: true },
        Title:{ type: String, required: true },
        Datejoon:{ type: String,required: true },
        Datejoin:{ type: String,required: true },
        Job_Sal:{ type: Number,required: true },
        Rating:{ type: Number, required: true ,default :0},
        LoRating:{ type: Number, required: true ,default :0},
        Status:{ type: String, required: true },
        Sop:{ type: String, required: true },
    }
)

module.exports = mongoose.model('appdy', Applicationd)