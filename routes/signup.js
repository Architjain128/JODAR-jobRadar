const express = require('express')
const Signup = require('../models/signup')
const Biob = require('../models/bio')
const bcrypt = require('bcryptjs')
const router = express.Router()
const JWT_SECRET = "u5esotcvp8ydrxyip8sxgvpudrxulvp8;yxgvxjctujgcoutcp8xpt"
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.get("/allacc/:id",(req,res)=>{
    if(!req.params.id){
        response.status="401";
            response.success="false";
            response.msg='password does not matches';
            return res.json(response)
    }
    bcrypt.compare(req.params.id, "$2a$12$YTKW0iaZfIdEbn2Xmvq5.uzo.yPJaR3.NPQ4Qbaf/rxeIHiE4XZFy")
    .then(isMatch => {
        if (!isMatch) {
            response.status="401";
            response.success="false";
            response.msg='password does not matches';
            return res.json(response)
        }
        else{
            Signup.find((err,user)=>{
                if(err)
                throw err;
                else{
                    res.status(201).json(user);
                }
            })
        }
    })
});

router.post("/test",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'test',
        type:'',
    }
    return res.json(response);
});


router.post('/signup',(req,res)=>{
    const {Firstname,Lastname,email,password,type,switched,company_name,contact_number,signup_time} = req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    let Checked=req.body.checked
    let Type=req.body.type
    if(Type==='a')
    {
        if(!Firstname||!Lastname||!email||!password)
        {
            console.log("Incomplete fields")
            response.status="401";
            response.success=false;
            response.msg="Incomplete fields";
            response.type=req.body.type;
            return res.json(response)
        }
    }
    else if(Type==='r')
    {
        if(!email||!password||!company_name||!contact_number)
        {
            console.log("Incomplete fields")
            response.status="401";
            response.success=false;
            response.msg="Incomplete fields";
            response.type=req.body.type;
            return res.json(response)
        }
    }
    if(!Checked)
    {
        console.log("not agreed on terms")
            response.status="401";
            response.success="false";
            response.msg='please agree our terms and condition';
            return res.json(response)
    }
    else{
        const newuser = new Signup({
            Firstname,
            Lastname,
            email,
            password,
            type,
            company_name,
            contact_number,
            signup_time : Date(Date.now()).toString(),
            admin : false,
        });
        if(type==="a")
        {
            newuser.company_name="NONE"
            newuser.contact_number="NONE"
        }
        if(type==="r")
        {
            newuser.Firstname="NONE"
            newuser.Lastname="NONE"
        }
        bcrypt.hash(newuser.password,12,(err,hash_pass)=>{
            if(err)
            throw err;
            newuser.password = hash_pass;
            newuser.save()
            .then(newuser=>{
                console.log("created a user " +newuser)
                response.status="201";
                response.success=true;
                response.msg="User created";
                response.type=req.body.type;
                response.userdata=newuser;
                return res.json(response)
            })
            .catch(err=>{
                console.log(err)
                console.log("email already used to create account")
                response.status="401";
                response.success=false;
                response.msg="Email already used to create account";
                response.type=req.body.type;
                return res.json(response)
            })
        })
        console.log("okoko")
        console.log(newuser)
        const UserId = newuser._id
        const Bio = "None"
        const newbio = new Biob({
            UserId,
            Bio,
        })
        newbio.save()
        .then(newbio=>{
            console.log("added bio " +newbio)
            // return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            // return res.json(response)
        })


    }
});
router.post('/login',(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
        token:'',
    }
    let Firstname=req.body.Firstname
    let Lastname=req.body.Lastname
    let Email=req.body.email
    let Password=req.body.password
    let Checked=req.body.checked
    response.type=req.body.type
    // console.log(req.data)

    if(!Email||!Password)
    {
        console.log("Incomplete fields")
            response.status="401";
            response.success="false";
            response.msg='Incomplete fields';
            return res.json(response)
    }
    if(!Checked)
    {
        console.log("not agreed on terms")
            response.status="401";
            response.success="false";
            response.msg='please agree our terms and condition';
            return res.json(response)
    }
    console.log(Email)
    Signup.findOne({email:Email})
    .then(user=>{
        console.log(user)
        if (!user) {
            response.status="401";
            response.success="false";
            response.msg='No user exists';
            return res.json(response)
        }
        else
        {
            bcrypt.compare(Password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        response.status="401";
                        response.success="false";
                        response.msg='password does not matches';
                        return res.json(response)
                    }
                    else{
                        let token = jwt.sign({_id:user._id},JWT_SECRET)
                        response.status="201";
                        response.success="true";
                        response.msg=`Welcome`;
                        response.token=token;
                        response.type=user.type;
                        response.userdata=user;
                        return res.json(response)
                    }
                }
            )
        }
    })
});

router.get("/pro",auth,(req,res)=>{
    res.send("uc")
})



module.exports = router