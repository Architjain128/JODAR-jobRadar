import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating'
import { ControlPointDuplicate, FormatAlignJustify } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const nodemailer = require('nodemailer'); 



export default class  Dashyy extends Component {
 constructor(props)
 {
     super(props)
     this.state={
         bid:localStorage.getItem('Jodar_joblist'),
         comname:"",
         email:"",
         ondate:"",
         jodar_id:localStorage.getItem('Jodar_id'),
         title:"",
         des:"",
         maxappz:"",
         maxposz:"",
         deadlinez:"",
         maxapp:"",
         maxpos:"",
         deadline:"",
         jtype:"",
         jdur:"",
         sala:"",
         skilltok:[],
         points:0,
         uptar:'',
         uptarval:'',
         soda:'1',
         sora:'1',
         sona:'1',
         mahadata : [],
         mahadata2 : [],
         point: "",
        }
    this.onChange=this.onChange.bind(this)
    this.getjobinfo=this.getjobinfo.bind(this)
    this.ondeljob=this.ondeljob.bind(this)
    this.onupjob=this.onupjob.bind(this)
    this.backMA=this.backMA.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleChange2=this.handleChange2.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.handlesortra = this.handlesortra.bind(this);
    this.handlesortna = this.handlesortna.bind(this);
    this.handlesortda = this.handlesortda.bind(this);
    this.ptor = this.ptor.bind(this);
    this.ptos = this.ptos.bind(this);
    this.stoa = this.stoa.bind(this);
 }
 getjobinfo = async () =>{
    const d1 = await axios.get('/user/'+this.state.jodar_id)
    const d2 = await axios.get('/getjob/'+this.state.bid)
    const dalist = await axios.get('/alljobslisting/'+this.state.bid)
    const daras = await axios.post('/getratingforjob/'+this.state.bid)

    if(daras.data.datarat.length){
        var raating  = daras.data.datarat[0].Raating
        var sumrating  = daras.data.datarat[0].sumRating
        var porat = sumrating/raating
        console.log(porat)
        this.setState({points:porat})
    }

    const mahadata =[];
    for(let i=0;i<dalist.data.dalljoblisting.length;i++)
    {
        const p = dalist.data.dalljoblisting[i];
        const puser = await axios.get('/user/'+ p["UserId"])
        const pedu = await axios.get('/alledu/'+ p["UserId"])
        const pskill = await axios.get('/allskill/'+ p["UserId"])
        const ppdf = await axios.get('/downloadpdf/'+ p["UserId"])

        let aedu =[];
        for(let i=0;i<pedu.data.data4.length;i++)
        {
            const ppe = {Edu:pedu.data.data4[i].Edu,Edus:pedu.data.data4[i].Edus,Edue:pedu.data.data4[i].Edue}
            aedu.push(ppe)
        }
        let askill =[]
        for(let i=0;i<pskill.data.data3.length;i++)
        {
            askill.push(pskill.data.data3[i].Spec)
        }
        const pa = {Zenmod:"",UserId:p["UserId"],Email:puser.data.data1.email,Status:p["Status"],Datejoon:p["Datejoon"],Sop:p["Sop"],Resume:ppdf.data.pdf,Rating:puser.data.data1.reset_token,sumRating:puser.data.data1.expire,fname:puser.data.data1.Firstname,lname:puser.data.data1.Lastname,uedu:aedu,uskill:askill}
        if(pa.Rating===0 || pa.sumRating===0 )pa.Rating=0
        else{
            pa.Rating = pa.Rating/pa.sumRating
        }
        console.log(pa)
        pa.Zenmod = pa.UserId +";"+pa.Email
        if(pa.Status.toLowerCase()!="rejected" || pa.Status.toLowerCase()!="reject"  )
        mahadata.push(pa)
    }

    this.setState({mahadata2:mahadata})
    this.setState({mahadata:mahadata}) 
    // console.log(mahadata)
    console.log(this.state.mahadata2)


    const dd1 = [];
    const dd2 = [];
    const sktok = d2.data.data5.Skill_Req.split(";");
    let jtypez=d2.data.data5.Job_Type
    let jdurz=d2.data.data5.Job_Dura
    if(jdurz===0 || jdurz === 7 || jdurz=== '0' || jdurz === '7' ) jdurz = "Indefinite"
    if(jtypez === "1" || jtypez === 1)jtypez = "Full Time"
    if(jtypez === "2" || jtypez === 2)jtypez = "Part Time"
    if(jtypez === "3" || jtypez === 3)jtypez = "Work From Home"
    this.setState({skilltok:sktok,comname:d1.data.data1.company_name,Title:d2.data.data5.Title,deadline:d2.data.data5.Deadline,des:d2.data.data5.Descri,maxapp:d2.data.data5.Maxappli,maxpos:d2.data.data5.Maxposi,jtype:jtypez,jdur:jdurz,sala:d2.data.data5.Job_Sal})
}

handlesortra=(e)=>{
    this.setState({sora : e.target.value,sona:"1",soda:"1"})
    let tempmahadata = this.state.mahadata
    if(e.target.value===2)
    tempmahadata.sort(function(a,b) {
      let g=a.Rating
      let h=b.Rating
      if(a.Rating==="NaN")g=6
      if(b.Rating==="NaN")h=6
      return g - h
    })
    if(e.target.value===3)
    tempmahadata.sort(function(a,b) {
      let g=a.Rating
      let h=b.Rating
      if(a.Rating==="NaN")g=-1
      if(b.Rating==="NaN")h=-1
      return h-g
    })
    this.setState({mahadata2:tempmahadata})
    console.log(tempmahadata)

  }
  handlesortna=(e)=>{
    this.setState({sona : e.target.value,sora:"1",soda:"1"})
    let tempmahadata = this.state.mahadata
    if(e.target.value===2)
    tempmahadata.sort(function(a,b) {
        let g=a.fname +" " +a.lname
        let h=b.fname +" " +b.lname
        g=g.toLowerCase();
        h=h.toLowerCase();
        return g.localeCompare(h)
    })
    if(e.target.value===3)
    tempmahadata.sort(function(a,b) {
        let g=a.fname +" " +a.lname
        let h=b.fname +" " +b.lname
        g=g.toLowerCase();
        h=h.toLowerCase();
        return h.localeCompare(g)
    })
    this.setState({mahadata2:tempmahadata})
    console.log(tempmahadata)
  }
  
  handlesortda=(e)=>{
    this.setState({soda : e.target.value,sona:"1",sora:"1"})
    let tempmahadata = this.state.mahadata
    // console.log(e.target.value)

    if(parseInt(e.target.value) === 2)
    {
        tempmahadata.sort(function(a,b){
            let g=a.Datejoon
            let h=b.Datejoon
            // console.log(g + h)
            let gdeadd=g.split(" ");
            let gdatede = gdeadd[0].split("/");
            let gtimede = gdeadd[1].split(":");
            let hdeadd=h.split(" ");
            let hdatede = hdeadd[0].split("/");
            let htimede = hdeadd[1].split(":");
            let gstr = `${("0"+gdatede[2]).split(-4)}/${("0"+gdatede[1]).split(-2)}/${("0"+gdatede[0]).split(-2)} ${("0"+gtimede[0]).split(-2)}:${("0"+gtimede[1]).split(-2)}`
            let hstr = `${("0"+hdatede[2]).split(-4)}/${("0"+hdatede[1]).split(-2)}/${("0"+hdatede[0]).split(-2)} ${("0"+htimede[0]).split(-2)}:${("0"+htimede[1]).split(-2)}`
            return hstr.localeCompare(gstr)

        //     if(parseInt(("0"+gdatede[2]).split(-4)) > parseInt(("0"+hdatede[2]).split(-4)))
        //     {
        //     return -1
        //     }
        //     else
        //     {
        //         if(parseInt(("0"+gdatede[1]).split(-2)) > parseInt(("0"+hdatede[1]).split(-2)))
        //         {
        //             return -1
        //         }
        //         else
        //         {
        //             if(parseInt(("0"+gdatede[0]).split(-2)) > parseInt(("0"+hdatede[0]).split(-2)))
        //             {
        //                 return -1
        //             }
        //             else
        //             {
        //                 if(parseInt(("0"+gtimede[0]).split(-2)) > parseInt(("0"+htimede[0]).split(-2)))
        //                 {
        //                     return -1
        //                 }
        //                 else
        //                 {
        //                     if(parseInt(("0"+gtimede[1]).split(-2)) > parseInt(("0"+htimede[1]).split(-2)))
        //                     {
        //                         return -1
        //                     }
        //                     else
        //                     {
        //                         return 1
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     return 1
        })
    }
    if(parseInt(e.target.value) === 3){
        console.log("asc")
        tempmahadata.sort(function(a,b) {
            let g=a.Datejoon
            let h=b.Datejoon
            // console.log(g + h)
            let gdeadd=g.split(" ");
            let gdatede = gdeadd[0].split("/");
            let gtimede = gdeadd[1].split(":");
            let hdeadd=h.split(" ");
            let hdatede = hdeadd[0].split("/");
            let htimede = hdeadd[1].split(":");
            let gstr = `${("0"+gdatede[2]).split(-4)}/${("0"+gdatede[1]).split(-2)}/${("0"+gdatede[0]).split(-2)} ${("0"+gtimede[0]).split(-2)}:${("0"+gtimede[1]).split(-2)}`
            let hstr = `${("0"+hdatede[2]).split(-4)}/${("0"+hdatede[1]).split(-2)}/${("0"+hdatede[0]).split(-2)} ${("0"+htimede[0]).split(-2)}:${("0"+htimede[1]).split(-2)}`
            return gstr.localeCompare(hstr)
            
            // if(parseInt(("0"+gdatede[2]).split(-4)) < parseInt(("0"+hdatede[2]).split(-4)))
            // {
            // return 1
            // }
            // else
            // {
            //     if(parseInt(("0"+gdatede[1]).split(-2)) < parseInt(("0"+hdatede[1]).split(-2)))
            //     {
            //         return 1
            //     }
            //     else
            //     {
            //         if(parseInt(("0"+gdatede[0]).split(-2)) < parseInt(("0"+hdatede[0]).split(-2)))
            //         {
            //             return 1
            //         }
            //         else
            //         {
            //             if(parseInt(("0"+gtimede[0]).split(-2)) < parseInt(("0"+htimede[0]).split(-2)))
            //             {
            //                 return 1
            //             }
            //             else
            //             {
            //                 if(parseInt(("0"+gtimede[1]).split(-2)) < parseInt(("0"+htimede[1]).split(-2)))
            //                 {
            //                     return 1
            //                 }
            //                 else
            //                 {
            //                     return -1
            //                 }
            //             }
            //         }
            //     }
            // }
            // return -1
        })
    }

    this.setState({mahadata2:tempmahadata})
    console.log(tempmahadata)
    
  }

async componentDidMount(){
    this.getjobinfo()
}

backMA(){
    window.location.href='/marketplace'
}
handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value}, () => {
        console.log(this.state)
    })
};
handleChange2 = (event) => {
    this.setState({uptarval:event.target.value})
};
onChange(event) {
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value}, () => {
        console.log(this.state)
    })
}
ondeljob(){
    axios.delete('/deljob/'+this.state.bid)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            alert("Job deleted")
            window.location.href='/marketplace'
        }
        else
        {
            alert("Error")
            window.location.reload()
        }
    })
    .catch(err=>{
        console.log(err)
    })
} 
onupjob(){
   let a = this.state.maxapp;
   let b = this.state.maxpos;
   let c = this.state.deadline;
   let az = this.state.maxappz;
   let bz = this.state.maxposz;
   let cz = this.state.deadlinez;
   console.log(a)
   console.log(b)
   console.log(c)
   console.log(az)
   console.log(bz)
   console.log(cz)
   console.log(a)
   console.log(b)
   console.log(c)
   if(a != az && az!="")a=az
   if(b != bz && bz!="")b=bz
   if(c != cz && cz!="")c=cz
    const newJob = {
        Maxappli:a,
        Maxposi:b,
        Deadline:c,
    }
    console.log(newJob)
    axios.put('/upjob/'+this.state.bid, newJob)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            alert("Job updated")
            window.location.reload()
        }
        else
        {
            alert("Error")
            window.location.reload()
        }
    })
    .catch(err=>{
        console.log(err)
    })
    this.setState({maxappz:"",maxposz:"",deadlinez:""});
} 
onSubmit(e) {
    e.preventDefault();

    const newJob = {
        UserId:this.state.jodar_id,
        Company_name:this.state.comname,
        email:this.state.email,
        Title:this.state.title,
        Descri:this.state.des,
        Maxappli:this.state.maxapp,
        Maxposi:this.state.maxpos,
        Deadline:this.state.deadline,
        Job_Type:this.state.jtype,
        Job_Dura:this.state.jdur,
        Job_Sal:this.state.sala,
        Skill_Req:this.state.skilltok,
        Rating:0,
        sumRating:0,
        Ondate:this.state.ondate,
    }

    console.log(newJob)
    axios.post('/addjob', newJob)
        .then(res => {
            console.log("ok")
            console.log(res.data)
            if(res.data.status === '201')
            {
                ///////
                alert("ok add")
            }
            else
            {
                alert("Error")
                // window.location.reload()
            }
        })
        .catch(err=>{
            console.log(err)
        })

    this.setState({
        comname:"",
        email:"",
        ondate:"",
        jodar_id:"",
        title:"",
        des:"",
        maxapp:"",
        maxpos:"",
        deadline:"",
        jtype:"",
        jdur:"",
        sala:"",
        skilltok:"",
        points:''
    });
}
ptor(e){

    let vall = e.currentTarget.value + this.state.bid
    axios.put('/ptor/'+vall)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            alert("Application rejected")
        }
        else
        {
            alert("Error in Rejection")
        }
        window.location.reload()
    })
    .catch(err=>{
        console.log(err)
    })
}

ptos(e){
    let vall = e.currentTarget.value + this.state.bid
    axios.put('/ptos/'+vall)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            alert("Application shortlisted")
        }
        else
        {
            alert("Error in shortlisting")
        }
        window.location.reload()
    })
    .catch(err=>{
        console.log(err)
    })
}
stoa(e){
    let all = e.currentTarget.value
    console.log(all)
    let zz = all.split(";");
    let vall = zz[0] + this.state.bid
    let emailiduser = zz[1]
    console.log(e.currentTarget)
    axios.put('/stoa/'+vall)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            axios.put("/asorall/"+ zz[0]+"+"+this.state.bid)
            axios.get('/mailit/'+emailiduser)
            .catch(err=>{
                console.log(err)
            })
            axios.get('/mailit/'+emailiduser)
            .then(res => {
                alert("Application accepted and mail sent to applicant")
            })
            .catch(err=>{
                console.log(err)
            })

        }
        else
        {
            alert("Error in accepting")
        }
        window.location.reload()
    })
    .catch(err=>{
        console.log(err)
    })
}
render (){
  return (
        <Container>
            <br/>
            <Button onClick={this.backMA} color="primary" variant="contained">Back to Dashboard</Button>
            <br/>
            <br/>
            <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">Company Name</Typography>
                <Typography variant="subtitle2">{this.state.comname}</Typography>
            </Box>
            <br/>
            <br/>
            <Box style={{backgroundColor:"rgb(247, 240, 250)",padding:25,borderRadius:5}}>

            <Paper elevation={3} style={{border:"black 5px solid"}}>
                <br/>
                <Typography variant="h3">{this.state.Title}</Typography><br/>
                <Typography variant="body1"><b>Deadline</b> {this.state.deadline}</Typography><br/>
                <Typography variant="body2">{this.state.des}</Typography><br/><Divider variant="middle" />
                <Typography variant="overline"><b>Max applications</b> {this.state.maxapp}</Typography><br/>
                <Typography variant="overline"><b>Max positions</b> {this.state.maxpos}</Typography><br/>
                <Typography variant="overline"><b>Skills Required </b> {this.state.skilltok.map(name => (<Chip variant="outlined" color="default" size="small" label={name} />))}</Typography><br/>
                <Typography variant="overline"><b>Salary </b> {this.state.sala}</Typography><br/><Divider variant="middle" />
                <Typography variant="overline"><b>Job Type</b> {this.state.jtype}</Typography><br/>
                <Typography variant="overline"><b>Job Duration </b> {this.state.jdur}</Typography><br/>
                <Typography variant="overline"><b>Job Rating </b><br/>
                {
                    (this.state.points === "" ||this.state.points === 0 ||this.state.points === "0" || this.state.points === "NaN" )
                    ?
                    <>Not rated yet</>
                    :
                    <>
                    <Rating name="half-rating-read" precision={0.5} name="read-only" value={this.state.points} readOnly />
                    </>
                }
                </Typography><br/>
                <br/>
            </Paper>
            </Box>
            <br/>
            <br/>
            <Box style={{backgroundColor:"rgb(247, 240, 250)",padding:25,borderRadius:5}}>

            <Paper elevation={1} style={{border:"rgb(63,81,181) 2px solid"}}>
                <br/>
                <Typography variant="body2">Choose field and enter new value in textbox and smash update</Typography>
                <br/>
                <br/>
                <TextField variant="outlined" label="Max applicant" name="maxappz" onChange={this.handleChange}></TextField>
                <TextField variant="outlined" label="Max Position" name="maxposz" onChange={this.handleChange}></TextField>
                <TextField variant="outlined" label="Deadline" name="deadlinez" onChange={this.handleChange}></TextField>
                <br/>
                <br/>
                <Button onClick={this.onupjob} color="primary" variant="contained">Update</Button>
                <br/>
                <br/>
                <br/>
            </Paper>
            <br/>
            <Paper elevation={1} style={{border:"red 2px solid"}}>
            <br/>
            <Button onClick={this.ondeljob} color="secondary" variant="contained">Delete</Button>
            <br/>
            <br/>
            </Paper>
            </Box>
            <br/>
            <br/>
               {/* <hr></hr> */}
               {/* <hr></hr> */}
                
                {
                this.state.mahadata != []
                ?
                <Box style={{backgroundColor:"rgb(247, 240, 250)",padding:25,borderRadius:5}}>
                    <Paper elevation={1} style={{border:"black 5px solid"}}>
                    <br/>
                    <br/>

                    <Typography variant="h3"><b>Sorting</b></Typography>
                    <br/>
                    <br/>
                    <InputLabel id="demo-simple-select-label">Sorting by Rating</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.sora}
                        onChange={this.handlesortra}
                    >
                        <MenuItem value={1}>None</MenuItem>
                        <MenuItem value={2}>Asc</MenuItem>
                        <MenuItem value={3}>Des</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel id="demo-simple-select-label">Sorting by Name of applicant</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.sona}
                        onChange={this.handlesortna}
                    >
                        <MenuItem value={1}>None</MenuItem>
                        <MenuItem value={2}>Asc</MenuItem>
                        <MenuItem value={3}>Des</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel id="demo-simple-select-label">Sorting by Date of apply</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.soda}
                        onChange={this.handlesortda}
                    >
                        <MenuItem value={1}>None</MenuItem>
                        <MenuItem value={2}>Asc</MenuItem>
                        <MenuItem value={3}>Des</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    </Paper>

                    <br/>
                    <br/>
                    {
                        this.state.mahadata2.map((row)=>(

                            row.Status === "pending"
                            ?
                            <div >
                            <Paper elevation={5} style={{border:"grey 3px solid"}}>
                                <br/>
                                <Typography variant="h5" style={{color:"grey"}}><b>PENDING</b></Typography><br/>
                                <Divider variant="middle"></Divider>
                                <br/>
                                <Typography><b>Applicant Name : </b> {row.fname} {row.lname}</Typography><br/>
                                <Typography><b>Rating : </b> {
                                row.Rating === 0 ?<>Not rated yet</>:<Rating readOnly precision={0.5} value={row.Rating}></Rating>
                                } </Typography>
                                <br/>
                                <Typography><b>Applied On : </b> {row.Datejoon} </Typography><br/>
                                <Typography><b>Skills</b></Typography>
                                {
                                    row.uskill.map((skill)=>(
                                        <Chip variant="outlined" color="default" size="small" label={skill} />
                                    ))
                                }
                                {
                                    !row.uskill.length && 
                                    <Chip variant="outlined" color="default" size="small" label="None" />
                                }
                                <br/>
                                <br/>
                                <Typography><b>Eduction</b></Typography>
                                {
                                    <TableContainer size="small" aria-label="a dense table" style={{width:600,paddingLeft:"25%"}} >
                                    <Table aria-label="customize table" >
                                        <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                        <TableRow>
                                            <TableCell style={{color:"white"}}>Institution Name</TableCell>
                                            <TableCell style={{color:"white"}} align="right">Start Date(YYYY)</TableCell>
                                            <TableCell style={{color:"white"}} align="right">End Date(YYYY)</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.uedu.map((edu) => (
                                            <TableRow>
                                                <TableCell >{edu.Edu}</TableCell>
                                                <TableCell align="right">{edu.Edus}</TableCell>
                                                <TableCell align="right">{edu.Edue}</TableCell>
                                            </TableRow>
                                            ))}
                                            {
                                            !row.uedu.length &&
                                            <TableRow>
                                                <TableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                            </TableRow>
                                            
                                            }
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                }
                                <br/>
                                <Typography><b>Statement of Purpose</b></Typography>
                                <Typography>{row.Sop}</Typography><br/>
                                {
                                    row.Resume === "false" ? <Button color="default" disabled="true"><b>No Resume</b></Button> : <Button color="primary" value={row.Resume} onClick={(e)=>{window.open(e.currentTarget.value)}}><b>Download Resume</b></Button>
                                }
                                {/* <iframe src={row.Resume} width="400" height="400"></iframe> */}
                                <br/><br/>
                                <Button value={row.UserId} onClick={this.ptor} color="secondary" variant="contained" >Reject</Button>
                                <Button value={row.UserId} onClick={this.ptos} variant="contained" style={{backgroundColor:"rgb(235, 158, 52)"}}>Shortlist</Button>
                                <br/>
                                <br/>

                            </Paper>
                            <br/>
                            <br/>
                            </div>
                            :
                            (row.Status === "shortlist" || row.Status === "shortlisted")
                            ?
                            <div >
                            <Paper elevation={5} style={{border:"rgb(235, 158, 52) 3px solid"}}>
                                <br/>
                                <Typography style={{color:"rgb(235, 158, 52)"}}><b>SHORTLISTED</b></Typography><br/>
                                <Divider variant="middle"></Divider>
                                <br/>
                                <Typography><b>Applicant Name : </b> {row.fname} {row.lname}</Typography><br/>
                                <Typography><b>Rating : </b> {
                                row.Rating === 0 ?<>Not rated yet</>:<Rating readOnly precision={0.5} value={row.Rating}></Rating>
                                } </Typography>
                                <Typography><b>Applied On : </b> {row.Datejoon} </Typography><br/>
                                <Typography><b>Skills</b></Typography>
                                {
                                    row.uskill.map((skill)=>(
                                        <Chip variant="outlined" color="default" size="small" label={skill} />
                                    ))
                                }
                                {
                                    !row.uskill.length && 
                                    <Chip variant="outlined" color="default" size="small" label="None" />
                                }
                                <br/>
                                <br/>
                                <Typography><b>Eduction</b></Typography>
                                {
                                    <TableContainer size="small" aria-label="a dense table" style={{width:600,paddingLeft:"25%"}} >
                                    <Table aria-label="customize table" >
                                        <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                        <TableRow>
                                            <TableCell style={{color:"white"}}>Institution Name</TableCell>
                                            <TableCell style={{color:"white"}} align="right">Start Date(YYYY)</TableCell>
                                            <TableCell style={{color:"white"}} align="right">End Date(YYYY)</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.uedu.map((edu) => (
                                            <TableRow>
                                                <TableCell >{edu.Edu}</TableCell>
                                                <TableCell align="right">{edu.Edus}</TableCell>
                                                <TableCell align="right">{edu.Edue}</TableCell>
                                            </TableRow>
                                            ))}
                                            {
                                            !row.uedu.length &&
                                            <TableRow>
                                                <TableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                            </TableRow>
                                            
                                            }
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                }
                                <br/>
                                <Typography><b>Statement of Purpose</b></Typography>
                                <Typography>{row.Sop}</Typography><br/>
                                {
                                    row.Resume === "false" ? <Button color="default" disabled="true"><b>No Resume</b></Button> : <Button color="primary" value={row.Resume} onClick={(e)=>{window.open(e.currentTarget.value)}}><b>Download Resume</b></Button>
                                }
                                {/* <iframe src={row.Resume} width="400" height="400"></iframe> */}
                                <br/><br/>
                                <Button value={row.UserId} onClick={this.ptor} color="secondary" variant="contained" >Reject</Button>
                                <Button value={row.Zenmod} onClick={this.stoa} name={row.Email} variant="contained" color="primary">Accept</Button>
                                {/* <Button value={row.UserId} onClick={this.stoa} emaildata={row.Email} variant="contained" color="primary">Accept</Button> */}
                                <br/>
                                <br/>

                            </Paper>
                            <br/>
                            <br/>
                            </div>
                            :
                            row.Status === "accepted"
                            ?
                            <div >
                            <Paper elevation={5} style={{border:"rgb(98, 184, 72) 3px solid"}}>
                                <br/>
                                <Typography style={{color:"rgb(98,184,72)"}}><b>ACCCEPTED</b></Typography><br/>
                                <Divider variant="middle"></Divider>
                                <br/>
                                <Typography><b>Applicant Name : </b> {row.fname} {row.lname}</Typography><br/>
                                <Typography><b>Rating : </b> {
                                row.Rating === 0 ?<>Not rated yet</>:<Rating readOnly precision={0.5} value={row.Rating}></Rating>
                                } </Typography>
                                <Typography><b>Applied On : </b> {row.Datejoon} </Typography><br/>
                                <Typography><b>Skills</b></Typography>
                                {
                                    row.uskill.map((skill)=>(
                                        <Chip variant="outlined" color="default" size="small" label={skill} />
                                    ))
                                }
                                {
                                    !row.uskill.length && 
                                    <Chip variant="outlined" color="default" size="small" label="None" />
                                }
                                <br/>
                                <br/>
                                <Typography><b>Eduction</b></Typography>
                                {
                                    <TableContainer size="small" aria-label="a dense table" style={{width:600,paddingLeft:"25%"}} >
                                    <Table aria-label="customize table" >
                                        <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                        <TableRow>
                                            <TableCell style={{color:"white"}}>Institution Name</TableCell>
                                            <TableCell style={{color:"white"}} align="right">Start Date(YYYY)</TableCell>
                                            <TableCell style={{color:"white"}} align="right">End Date(YYYY)</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.uedu.map((edu) => (
                                            <TableRow>
                                                <TableCell >{edu.Edu}</TableCell>
                                                <TableCell align="right">{edu.Edus}</TableCell>
                                                <TableCell align="right">{edu.Edue}</TableCell>
                                            </TableRow>
                                            ))}
                                            {
                                            !row.uedu.length &&
                                            <TableRow>
                                                <TableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                                <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                            </TableRow>
                                            
                                            }
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                }
                                <br/>
                                <Typography><b>Statement of Purpose</b></Typography>
                                <Typography>{row.Sop}</Typography><br/>
                                {
                                    row.Resume === "false" ? <Button color="default" disabled="true"><b>No Resume</b></Button> : <Button color="primary" value={row.Resume} onClick={(e)=>{window.open(e.currentTarget.value)}}><b>Download Resume</b></Button>
                                }
                                {/* <Button value={row.Zenmod} onClick={this.stoa} name={row.Email} variant="contained" color="primary">Accept</Button> */}

                                {/* <iframe src={row.Resume} width="400" height="400"></iframe> */}
                                <br/>
                                <br/>

                            </Paper>
                            <br/>
                            </div>
                            :
                            null
                        ))
                    }
                    

                </Box>
                :
                null
                }

                <br/>
                <br/>
                <br/>
        </Container>
  )};
}
