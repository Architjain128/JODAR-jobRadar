const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const Port = process.env.PORT || '6050'
const db = require('./database/index')
const path = require('path');

app.use(fileUpload())
app.use(bodyParser.urlencoded({extended : true , limit:'50mb'}))
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}))
app.use(express.static('public'))
app.use(require('./routes/signup'))
app.use(require('./routes/skill'))
app.use(require('./routes/user'))
app.use(require('./routes/application'))
app.use(require('./routes/statandrate'))
app.use(require('./routes/job'))
app.use(require('./routes/edu'))
app.use(require('./routes/miss'))


db.once('open', ()=> console.log("connected to db"))
db.on('error', ()=> console.error('oops cannot connect to db'))

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {

    // Exprees will serve up production assets
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    console.log("CUSTOM MESSAGE: current environment is " + process.env.NODE_ENV);
    console.log("CUSTOM MESSAGE: " + __dirname);

    // Express serve up index.html file if it doesn't recognize route
    // REALLY STUPID WAY, FIND SOMETHING BETTER, TRIED EVERYTHING, ONLY THIS WORKED FOR THE TIME BEING
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
    app.get('*', (req, res) => {
        let pa = req.params['0'];
        pa = pa.substring(1, pa.length - 1);

        res.sendFile(path.join(__dirname, 'frontend', 'build', `${pa}`));
        console.log('CUSTOM MESSAGE: VALUE OF PA->' + pa);
    });
}

app.listen(Port , ()=>{
    console.log("yup!!!",Port)
})