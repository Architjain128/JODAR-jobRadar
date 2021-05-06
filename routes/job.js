const express = require('express')
const Jobs = require('../models/job')
const Applicationd = require('../models/application')
const router = express.Router()
const auth = require('../middleware/auth')

router.get("/alljobposted",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
   
        Jobs.find()
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                // response.data2=data2;
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                response.dataAA=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    
});
router.post("/addjob",(req,res)=>{
    const {UserId,Company_name,email,Title,Descri,Maxappli,Maxposi,Deadline,Job_Type,Job_Dura,Job_Sal,Skill_Req,Rating,sumRating,Ondate} = req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    console.log(req.body)
    if(!UserId||!Company_name||!email||!Title||!Descri||!Maxappli||!Maxposi||!Deadline||!Job_Type||!Job_Dura||!Job_Sal||!Skill_Req||!Ondate)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        const newjob = new Jobs({
            UserId,
            Company_name,
            email,
            Title,
            Descri,
            Maxappli,
            Maxposi,
            Deadline,
            Job_Type,
            Job_Dura,
            Job_Sal,
            Skill_Req,
            Rating,
            sumRating,
            Ondate
        });
        newjob.save()
        .then(newjob=>{
            console.log("job added")
            response.status="201";
            response.success=true;
            response.msg="Job added";
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
})
router.get("/alljob/:id",(req,res)=>{
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
        Jobs.find({UserId:userid})
        .then(matter=>{
            if (!matter) {
                // const data2={Bio:"None"}
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                // response.data2=data2;
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                response.data1=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});
router.get("/getjob/:id",(req,res)=>{
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
        Jobs.findOne({_id:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                response.data5=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});
router.get("/getjobuser/:id",(req,res)=>{
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
        Jobs.find({UserId:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                response.datapp=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});
router.delete("/deljob/:id",(req,res)=>{
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
        Jobs.deleteOne({_id:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                console.log(matter);
                return res.json(response)
            }
        })
        Applicationd.deleteMany({JobId:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No application';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`done`;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});
router.put("/upjob/:id",(req,res)=>{
    let userid = req.params.id
    const {Maxappli,Maxposi,Deadline} = req.body
    console.log(Maxappli)
    console.log(Maxposi)
    console.log(Deadline)
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    console.log(req.body)
    if(!Deadline||!Maxappli||!Maxposi)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        const newjob = new Jobs({
            Maxappli,
            Maxposi,
            Deadline,
        });
        Jobs.findOneAndUpdate({_id:userid},{Maxappli:Maxappli,Maxposi:Maxposi,Deadline:Deadline},{new:true})
        .then(oldbio=>{
            console.log("updated")
            response.status="201";
            response.success=true;
            response.msg="updated";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to update";
            return res.json(response)
        })
    }
});
router.get("/allaccepetdjoblistings/:id",(req,res)=>{
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
        Jobs.findOne({UserId:userid})
        .then(matter=>{
            if (!matter) {
                response.status="401";
                response.success="false";
                response.msg='No user exists';
                return res.json(response)
            }
            else{
                response.status="201";
                response.success="true";
                response.msg=`showing user`;
                response.allacceptedjobs=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});
router.get("/jobratins",(req,res)=>{
    
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }

    Applicationd.aggregate(
        [
            {"$match" : {"Rating" : {"$not" : {"$eq" : 0}}}},
            {"$group" : {"_id":"$JobId",Raating : {"$sum" : 1},sumRating : {"$sum" : "$Rating"}}}
        ]
    )
    .then(matter=>{
        if (!matter) {
            response.status="401";
            response.success="false";
            response.msg='No user exists';
            return res.json(response)
        }
        else{
            response.status="201";
            response.success="true";
            response.msg=`showing user`;
            response.allratedjob=matter;
            console.log(matter);
            return res.json(response)
        }
    })
    
});

module.exports = router