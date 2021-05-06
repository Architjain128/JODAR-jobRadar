const express = require('express')
const Skills = require('../models/skills')
const router = express.Router()
const auth = require('../middleware/auth')


router.get("/skill",(req,res)=>{
    Skills.find((err,user)=>{
        if(err)
        throw err;
        else{
            res.status(201).json(user);
        }
    })
});

router.post("/addskill",(req,res)=>{
    const {UserId,Spec} = req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!Spec||!UserId)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        const newskill = new Skills({
            UserId,
            Spec,
        });
        newskill.save()
        .then(newskill=>{
            console.log("added skill " +newskill)
            response.status="201";
            response.success=true;
            response.msg="Skill added";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to add skill";
            return res.json(response)
        })
    }
});

router.get("/allskill/:id",(req,res)=>{
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
        Skills.find({UserId:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No skill or user exists';
                response.data3="empty";
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing skills`;
                response.data3=matter;
                return res.json(response)
            }
        })
    }
});

module.exports = router
