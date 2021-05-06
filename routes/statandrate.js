const express = require('express')
const Applicationd = require('../models/application')
const Signup = require('../models/signup')
const router = express.Router()
const auth = require('../middleware/auth')

router.put("/ptor/:id",(req,res)=>{
    let userid = req.params.id
        let datee = new Date();
        let dated = datee.getDate();
        let month = datee.getMonth() +1 ;
        let yeard = datee.getFullYear();
        let horus = datee.getHours();
        let minite = datee.getMinutes();
        let dtstr = dated + "/" + month + "/" + yeard + " "+horus + ":" + minite
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    status = "rejected"

    Applicationd.findOneAndUpdate({juid:userid},{Status:status,Datejoin:dtstr},{new:true})
    .then(oldbio=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="application rejected";
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to reject";
        return res.json(response)
    })
})

router.put("/ptos/:id",(req,res)=>{
    let userid = req.params.id
            let datee = new Date();
        let dated = datee.getDate();
        let month = datee.getMonth() +1 ;
        let yeard = datee.getFullYear();
        let horus = datee.getHours();
        let minite = datee.getMinutes();
        let dtstr = dated + "/" + month + "/" + yeard + " "+horus + ":" + minite
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    status = "shortlist"

    Applicationd.findOneAndUpdate({juid:userid},{Status:status,Datejoin:dtstr},{new:true})
    .then(oldbio=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="application shortlisted";
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to shortlist";
        return res.json(response)
    })
})
router.put("/stoa/:id",(req,res)=>{
    let userid = req.params.id
            let datee = new Date();
        let dated = datee.getDate();
        let month = datee.getMonth() +1 ;
        let yeard = datee.getFullYear();
        let horus = datee.getHours();
        let minite = datee.getMinutes();
        let dtstr = dated + "/" + month + "/" + yeard + " "+horus + ":" + minite
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    status = "accepted"

    Applicationd.findOneAndUpdate({juid:userid},{Status:status,Datejoin:dtstr},{new:true})
    .then(oldbio=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="application accepted";
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to accept";
        return res.json(response)
    })
})

router.put("/asorall/:id",(req,res)=>{
    let idandjuid = req.params.id
    let pp = idandjuid.split("+")
    let userid = pp[0]
    let juid = pp[0]+pp[1]

        let datee = new Date();
        let dated = datee.getDate();
        let month = datee.getMonth() +1 ;
        let yeard = datee.getFullYear();
        let horus = datee.getHours();
        let minite = datee.getMinutes();
        let dtstr = dated + "/" + month + "/" + yeard + " "+horus + ":" + minite
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    status = "rejected"

    Applicationd.updateMany({UserId:userid,},{Status:status,Datejoin:dtstr},{new:true})
    .then(oldbio=>{
        Applicationd.updateOne({juid:juid},{Status:"accepted",Datejoin:dtstr},{new:true})
        .then(oldbio=>{
            console.log("updated")
            response.status="201";
            response.success=true;
            response.msg="application accepted";
            return res.json(response)
        })
        .catch(err=>{
            console.log(err)
            console.log("Failed")
            response.status="401";
            response.success=false;
            response.msg="Failed to accept";
            return res.json(response)
        })
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to accept";
        return res.json(response)
    })
})
router.put("/rateaappdies/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
  
    console.log(req.body)
    console.log(req.body.rated)
    const rat  = req.body.rated
    Applicationd.findOneAndUpdate({juid:userid},{Rating:rat},{new:true})
    .then(oldbio=>{
        console.log("updated")
        response.status="201";
        response.success=true;
        response.msg="Rated";
        return res.json(response)
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to rate";
        return res.json(response)
    })

})


router.post("/rateuser/:id",(req,res)=>{
    let userid = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    console.log(req.body)
    // console.log(req.body.rated)
    const rat  = req.body.rated
    const juid  = req.body.juid
    Signup.updateOne({_id:userid},{"$inc":{"reset_token" : rat,"expire":1}})
    .then(oldbio=>{
        Applicationd.updateOne({juid:juid},{"$inc":{"LoRating" : rat}})
            .then(odbio=>{
                console.log("updated")
                response.status="201";
                response.success=true;
                response.msg="Rated";
                return res.json(response)
            })
            .catch(err=>{
                console.log(err)
                console.log("Failed")
                response.status="401";
                response.success=false;
                response.msg="Failed to rate";
                return res.json(response)
            })
    })
    .catch(err=>{
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="Failed to rate";
        return res.json(response)
    })

})


module.exports = router
