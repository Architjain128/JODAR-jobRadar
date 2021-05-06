const jwt = require('jsonwebtoken')
const JWT_SECRET = "u5esotcvp8ydrxyip8sxgvpudrxulvp8;yxgvxjctujgcoutcp8xpt"
const mongoose = require('mongoose')
const Signup = require('../models/signup')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({
            error : "not authorised to access it"
        })
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.status(401).json({
                error : "not authorised to access it"
            })
        }
        const {_id} = payload
        Signup.findById(_id)
        .then(user=>{
            req.user = user
        })
        next()
    })
}