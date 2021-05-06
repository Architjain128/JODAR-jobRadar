const express = require('express')
const Signup = require('../models/signup')
const Biob = require('../models/bio')
const router = express.Router()
const auth = require('../middleware/auth')
const fs = require('fs');


router.get("/all",(req,res)=>{
    Signup.find((err,user)=>{
        if(err)
        throw err;
        else{
            res.status(201).json(user);
        }
    })
});

router.get("/user/:id",(req,res)=>{
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
        Signup.findOne({_id:userid})
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
                response.data1=matter;
                return res.json(response)
            }
        })
    }
});

router.get("/bio/:id",(req,res)=>{
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
        Biob.findOne({UserId:userid})
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
                response.data2=matter;
                console.log(matter);
                return res.json(response)
            }
        })
    }
});

router.post("/addbio",(req,res)=>{
    const {UserId,Bio} = req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!UserId||!Bio)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        const newbio = new Biob({
            UserId,
            Bio,
        })
        newbio.save()
        .then(newbio=>{
            console.log("added bio " +newbio)
            response.status="201";
            response.success=true;
            response.msg="Bio added";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to add bio";
            return res.json(response)
        })
    }
});


router.put("/upbio/:id",(req,res)=>{
    let userid = req.params.id
    const Bio = req.body.Bio
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(!Bio)
    {
        console.log("Incomplete fields")
        response.status="401";
        response.success=false;
        response.msg="Incomplete fields";
        return res.json(response)
    }
    else{
        Biob.findOneAndUpdate({UserId:userid},{Bio:Bio},{new:true})
        .then(oldbio=>{
            console.log("added bio " +oldbio)
            response.status="201";
            response.success=true;
            response.msg="Bio added";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to add bio";
            return res.json(response)
        })
    }
});

router.post("/addimg/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    var pp = req.files.dp
    var ext = pp.name.split('.').pop(); 
    if(!(ext==='jpg'||ext==='jpeg'||ext==='png'))
    {
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="file must be .pdf";
        return res.json(response)
    }
    var imgname = userid +'.'+ ext
    console.log(imgname)
    pp.mv('public/pimg/'+imgname,function(err,imgg){
        if(err)
        {
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to update img";
            return res.json(response)
        }
        else{
            console.log("added img")
            response.status="201";
            response.success=true;
            response.msg="Image added";
            return res.json(response)
        }
    })
});

router.post("/addpdf/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    var pp = req.files.dp
    var ext = pp.name.split('.').pop(); 
    if(ext!=='pdf')
    {
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="file must be .pdf";
        return res.json(response)
    }
    var imgname = userid +'.'+ ext
    console.log(imgname)
    pp.mv('public/pdf/'+imgname,function(err,imgg){
        if(err)
        {
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to update pdf";
            return res.json(response)
        }
        else{
            console.log("added img")
            response.status="201";
            response.success=true;
            response.msg="pdf added";
            return res.json(response)
        }
    })
});
router.get("/getimg/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    var tmpfile = "public/pimg/"+userid+'.jpg'
    if(fs.existsSync(tmpfile))
    {
        console.log("ok")
    }
    else{
        tmpfile = "public/pimg/"+userid+'.jpeg'
        if(fs.existsSync(tmpfile))
        {
            console.log("ok")
        }
        else{
            tmpfile = "public/pimg/noprofile.jpg"
        }
    }
    tmpfile=tmpfile.substring(6)
    tmpfile=""+tmpfile
    console.log(tmpfile)
    console.log("added img")
    response.status="201";
    response.success=true;
    response.msg="Image added";
    response.proimg=tmpfile;
    return res.json(response)
});
router.get("/getpdf/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    var tmpfile = "public/pdf/"+userid+'.pdf'
    if(fs.existsSync(tmpfile))
    {
        console.log("ok")
    }
    else{
        tmpfile = "public/pdf/nopdf.pdf"
    }
    tmpfile=tmpfile.substring(6)
    tmpfile=""+tmpfile+"#zoom=FitH"
    console.log(tmpfile)
    console.log("added img")
    response.status="201";
    response.success=true;
    response.msg="Image added";
    response.pdf=tmpfile;
    return res.json(response)
});
router.get("/downloadpdf/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    var tmpfile = "public/pdf/"+userid+'.pdf'
    if(fs.existsSync(tmpfile))
    {
        console.log("ok")
        tmpfile=tmpfile.substring(6)
        tmpfile=""+tmpfile
        response.status="201";
        response.success=true;
        response.msg="Downloaded";
        response.pdf=tmpfile;
        return res.json(response)
    }
    else{
        console.log("added img")
        response.status="201";
        response.success=true;
        response.msg="no cv";
        response.pdf="false";
        return res.json(response)
    }
 
});
router.put("/uppro",(req,res)=>{
    let userid = req.body.UserId
    let Firstname = req.body.Firstname
    let Lastname = req.body.Lastname
    let email = req.body.email

    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    if(Firstname==="" && Lastname==="" && email==="")
    {
        console.log("Incomplete fields")
        response.status="201";
        response.success=false;
        response.msg="Nothing to update";
        return res.json(response)
    }
    else{
        let mssg = "Updated"
        dush = {}
        if(Firstname){
            mssg = mssg + ", Firstname"
            dush.Firstname = Firstname
        }
        if(Lastname){
            mssg = mssg + ", Lastname"
            dush.Lastname = Lastname
        }
        if(email){
            mssg = mssg + ", email"
            dush.email = email
        }

        Signup.findOneAndUpdate({_id:userid},dush)
        .then(oldbio=>{
            console.log("updated")
            response.status="201";
            response.success=true;
            response.msg=mssg;
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
router.put("/upprofile",(req,res)=>{
    let userid = req.body.UserId
    let Companyname = req.body.Companyname
    let Companynum = req.body.Companynum
    let email = req.body.email
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    console.log(Companyname + Companynum + email)
    if(Companyname==="" && Companynum==="" && email==="")
    {
        console.log("Incomplete fields")
        response.status="201";
        response.success=false;
        response.msg="Nothing to update";
        return res.json(response)
    }
    else{
        let mssg = "Updated"
        dush = {}
        if(Companyname){
            mssg = mssg + " Company name"
            dush.company_name = Companyname
        }
        if(Companynum){
            mssg = mssg + " Company number"
            dush.contact_number = Companynum
        }
        if(email){
            mssg = mssg + " email"
            dush.email = email
        }

        Signup.findOneAndUpdate({_id :userid},dush)
        .then(oldbio=>{
            console.log("updated")
            response.status="201";
            response.success=true;
            response.msg=mssg;
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
module.exports = router
