const express = require('express')
const Education = require('../models/edu')
const router = express.Router()
const auth = require('../middleware/auth')


router.get("/edu",(req,res)=>{
    Education.find((err,user)=>{
        if(err)
        throw err;
        else{
            res.status(201).json(user);
        }
    })
});


router.post("/addedu",(req,res)=>{
    const {UserId,Edu,Edus,Edue} = req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!Edu||!Edus||!UserId)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        if(!Edue)
        {
            Edue="present"
        }
        const newedu = new Education({
            UserId,
            Edu,
            Edus,
            Edue,
        });
        newedu.save()
        .then(newedu=>{
            console.log("added edu " +newedu)
            response.status="201";
            response.success=true;
            response.msg="Instance added";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to add instance";
            return res.json(response)
        })
    }
});

router.get("/alledu/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!userid)
    {
        console.log("User_id not passed")
        response.status="401";
        response.success=false;
        response.msg="Require login due to expire token";
        return res.json(response)
    }
    else{
        Education.find({UserId:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No edu or user exists';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing education instance`;
                response.data4=matter;
                return res.json(response)
            }
        })
    }
});

module.exports = router