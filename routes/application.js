const express = require('express')
const Applicationd = require('../models/application')
const router = express.Router()
const auth = require('../middleware/auth')

router.get("/getmaxapp/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.countDocuments({JobId:jobid,Status:'pending'},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dma=num;
                return res.json(response)
            }
        })
    }
});

router.get("/getmaxpos/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.countDocuments({JobId:jobid,Status:'accepted'},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dmp=num;
                return res.json(response)
            }
        })
    }
});

router.get("/myappli/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.countDocuments({UserId:jobid,Status:'pending'},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dap=num;
                return res.json(response)
            }
        })
    }
});
router.get("/myapplicur/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.countDocuments({UserId:jobid,Status:'accepted'},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dac=num;
                return res.json(response)
            }
        })
    }
});
// router.get("/myapplicur/:id/:id2",(req,res)=>{
//     const jobid = req.params.id
//     const userid = req.params.id2
//     let response={
//         status:'100',
//         success:'',
//         msg:'',
//         type:'',
//     }
//     if(!jobid)
//     {
//         console.log("Incomplete fields")
//         response.status="401";
//         response.success=false;
//         response.msg="Incomplete fields";
//         return res.json(response)
//     }
//     else{
//         Applicationd.countDocuments({UserId:userid,JobId:jobid},function(err,num){
//             if(err)
//             {
//                 console.log(err)
//                 console.log("Failed")
//                 response.status="401";
//                 response.success=false;
//                 response.msg="Error";
//                 return res.json(response)
//             }
//             else{
//                 console.log("added edu ")
//                 response.status="201";
//                 response.success=true;
//                 response.msg="Ok";
//                 response.dbol=num;
//                 return res.json(response)
//             }
//         })
//     }
// });
router.post("/jobindash",(req,res)=>{
    const {JobId,UserId,Company_name,Title,Datejoon,Datejoin,Job_Sal,Rating,Status,Sop} = req.body
    console.log(req.body)
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    juid=UserId+JobId;
    if(!JobId||!UserId||!Company_name||!Title||!Datejoon||!Job_Sal||!Status||!Sop)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        const newlistjob = new Applicationd({
            JobId,
            UserId,
            juid,
            Company_name,
            Title,
            Datejoon,
            Datejoin,
            Job_Sal,
            Rating,
            Status,
            Sop
        });
        newlistjob.save()
        .then(newlist=>{
            console.log("added SOP")
            response.status="201";
            response.success=true;
            response.msg="Ok";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Error";
            return res.json(response)
        })
    }
});


router.post("/allapp",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    Applicationd.aggregate(
        [
            {"$match" : {}},
            {"$group" : {"_id":"$JobId",total : {"$sum" : 1}}}
        ]
    )
    .then(oll=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="updated";
        response.dataallapp = oll;
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to fetch";
        return res.json(response)
    })
});
router.post("/acceptedapp",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    Applicationd.aggregate(
        [
            {"$match" : {"Status":"accepted"}},
            {"$group" : {"_id":"$JobId",total : {"$sum" : 1}}}
        ]
    )
    .then(oll=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="updated";
        response.acceptedapp = oll;
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to fetch";
        return res.json(response)
    })
});

router.post("/pendingapp",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    Applicationd.aggregate(
        [
            {"$match" : {"Status":'pending'}},
            {"$group" : {"_id":"$JobId",total : {"$sum" : 1}}}
        ]
    )
    .then(oll=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="updated";
        response.datapendingapp = oll;
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to fetch";
        return res.json(response)
    })
});

router.get("/myallappliedjobs/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.find({UserId:jobid},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dalljobapplied=num;
                return res.json(response)
            }
        })
    }
});
router.get("/alljobslisting/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.find({JobId:jobid},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.dalljoblisting=num;
                return res.json(response)
            }
        })
    }
});
router.get("/allmypostedjobs/:id",(req,res)=>{
    const jobid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!jobid)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Applicationd.find({JobId:jobid,Status:"accepted"},function(err,num){
            if(err)
            {
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Error";
                return res.json(response)
            }
            else{
                console.log("added edu ")
                response.status="201";
                response.success=true;
                response.msg="Ok";
                response.allmypostedjobs=num;
                return res.json(response)
            }
        })
    }
});
router.post("/getratingforjob/:id",(req,res)=>{
    let jid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    // db.appdies.aggregate([{$match : {JobId : "5fff2eb7a248e56085d161da",Rating :{$not :{$eq :0}}}},{$group : {_id: "5fff2eb7a248e56085d161da",Raating : {$sum : 1},sumRating :{$sum : "$Rating"}}}])
    Applicationd.aggregate(
        [
            {"$match" : {"JobId": jid,"Rating" : {"$not" : {"$eq" : 0}}}},
            {"$group" : {"_id":"$JobId",Raating : {"$sum" : 1},sumRating : {"$sum" : "$Rating"}}}
        ]
    )
    .then(oll=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="updated";
        response.datarat = oll;
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to fetch";
        return res.json(response)
    })
});


module.exports = router