const nodemailer = require('nodemailer'); 
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const bcrypt = require('bcryptjs')

let mailTransporter = nodemailer.createTransport({ 
	service: 'gmail', 
	auth: { 
		user: 'jodarappssad@gmail.com', 
		pass: 'Jodar_ssad_123'
	} 
});

router.post("/companypic/:id",(req,res)=>{
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }

    var pp = req.files.dp 
    var pass = req.params.id
    console.log(pass)
    var ext = pp.name.split('.').pop(); 
    if(!(ext==='jpg'||ext==='jpeg'||ext==='png'))
    {
        console.log(err)
        console.log("Failed")
        response.status="401";
        response.success=false;
        response.msg="file must be a .jpg";
        return res.json(response)
    }
    var imgname =  'meme.'+ ext
    console.log(imgname)

    bcrypt.compare(pass, "$2a$12$YTKW0iaZfIdEbn2Xmvq5.uzo.yPJaR3.NPQ4Qbaf/rxeIHiE4XZFy")
    .then(isMatch => {
        if (!isMatch) {
            response.status="401";
            response.success="false";
            response.msg='password does not matches';
            return res.json(response)
        }
        else{
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
        }
    })
    
});

router.get("/mailit/:id",(req,res)=>{
    let mailtoit = req.params.id
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    
    if(mailtoit)
    {
        const mailDetails = ( {
            from: 'jodarappssad@gmail.com', 
            to: mailtoit,
            subject: 'Application got accepted', 
            html : `<img alt="Congrats GIFs | Tenor" class="n3VNCb" src="https://media1.tenor.com/images/2386d12e54aa11ce0298d100954d982a/tenor.gif?itemid=4384522" data-deferred="1" id="imi" data-w="498" data-h="243" jsname="HiaYvf" jsaction="load:XAeZkd;" data-atf="true" data-iml="7185.085000004619" style="height: 243px; width: 498px; margin: 0px;">
<br/><pre>Congratulations,

Your application got accepted just now. For more details go to your dashboard.
            
Best wishes,
Jodar</pre>`
        }); 
        console.log(mailDetails)
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
                console.log('Error Occurs'); 
                console.log(err); 
                response.status="401";
                response.success=false;
            } else { 
                console.log('Email sent successfully' + mailtoit); 
                response.status="201";
                response.success=true;
            } 
        });
    }
    return res.json(response)

})

router.get("/mailme",(req,res)=>{
    let {mailtome,subject,text}=req.body
    let response={
        status:'100',
        success:'',
        msg:'',
        type:'',
    }
    
    if(mailtome)
    {
        const mailDetails = ( {
            from: 'jodarappssad@gmail.com', 
            to: mailtome,
            subject: subject,
            html : text
        }); 
        console.log(mailDetails)
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
                console.log('Error Occurs'); 
                console.log(err); 
                response.status="401";
                response.success=false;
            } else { 
                console.log('Email sent successfully' + mailtome); 
                response.status="201";
                response.success=true;
            } 
        });
    }
    return res.json(response)
})

module.exports = router
