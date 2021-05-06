const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://archit:architjain@cluster0.c40il.mongodb.net/jodar?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose
    .connect(uri, { useCreateIndex : true, useNewUrlParser : true , useUnifiedTopology : true,useFindAndModify: false})
    .catch(e=>{
        console.error('connection error', e.message)
    })
const db = mongoose.connection
module.exports = db
