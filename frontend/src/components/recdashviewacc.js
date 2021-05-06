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
import { FormatAlignJustify } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DATE_COL_DEF } from '@material-ui/data-grid';
import SplitButton2 from './buttongrp2'



export default class  Acceptedlist extends Component {
 constructor(props)
 {
     super(props)
     this.state={
         comname:this.props.data1[0],
         email:"",
         ondate:"",
         jodar_id:localStorage.getItem('Jodar_id'),
         accmahadata : [],
         accmahadata2 : [],
         sora : "1",
         soda : "1",
         sota : "1",
         sona : "1",
        }
        console.log(props)
    this.onChange=this.onChange.bind(this)
    this.getjobinfo=this.getjobinfo.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleChange2=this.handleChange2.bind(this)
    this.handlesortra = this.handlesortra.bind(this);
    this.handlesortna = this.handlesortna.bind(this);
    this.handlesortda = this.handlesortda.bind(this);
    this.handlesortta = this.handlesortta.bind(this);
 }
 getjobinfo = async () =>{
    //  all accepted jobs from applicationd
    const pp =   await axios.get('/getjobuser/'+ this.state.jodar_id)

    const mahadata =[];
    for(let i=0;i<pp.data.datapp.length;i++)
    {
        const p = pp.data.datapp[i];
        const pjob = await axios.get('/allmypostedjobs/'+ p["_id"])
        for(let j=0;j<pjob.data.allmypostedjobs.length;j++)
        {
            const pj = pjob.data.allmypostedjobs[j];
            const puser = await axios.get('/user/'+ pj["UserId"])
            const pa = {JOBUSID:pj['juid'],LoRating:pj["LoRating"],Raating:0,Title:p["Title"],Jtype:p["Job_Type"],Datejoin:pj["Datejoin"],Rating:puser.data.data1.expire,sumRating:puser.data.data1.reset_token,fname:puser.data.data1.Firstname,lname:puser.data.data1.Lastname, uid : puser.data.data1._id}
            if(pa.Rating===0)pa.Raating = 0
            else{
                pa.Raating = pa.sumRating/pa.Rating
            }
            if(pa.Jtype===1)pa.Jtype = "Full Time"
            if(pa.Jtype===2)pa.Jtype = "Part Time"
            if(pa.Jtype===3)pa.Jtype = "Work From Home"
            console.log(pa)
            mahadata.push(pa)
        }
    }

    
    this.setState({accmahadata2:mahadata,accmahadata:mahadata})
    // console.log(mahadata)
    // console.log(this.state.accmahadata2)
}

handlesortra=(e)=>{
    this.setState({sora : e.target.value,sona:"1",soda:"1",sota:"1"})
    let tempmahadata = this.state.accmahadata
    if(e.target.value===2)
    tempmahadata.sort(function(a,b) {
      let g=a.Raating
      let h=b.Raating
      if(a.Raating==="NaN" ||a.Raating===NaN || a.Raating=== 0)g=6
      if(b.Raating==="NaN" ||b.Raating===NaN || b.Raating=== 0)h=6
      return g - h
    })
    if(e.target.value===3)
    tempmahadata.sort(function(a,b) {
      let g=a.Raating
      let h=b.Raating
      if(a.Raating==="NaN" ||a.Raating===NaN || a.Raating=== 0)g=-1
      if(b.Raating==="NaN" ||b.Raating===NaN || b.Raating=== 0)h=-1
      return h-g
    })
    this.setState({accmahadata2:tempmahadata})
    // console.log(tempmahadata)
  }
  handlesortna=(e)=>{
    this.setState({sona : e.target.value,sora:"1",soda:"1",sota:"1"})
    let tempmahadata = this.state.accmahadata
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
    this.setState({accmahadata2:tempmahadata})
    // console.log(tempmahadata)
  }
    handlesortta=(e)=>{
    this.setState({sota : e.target.value,sora:"1",soda:"1",sona:"1"})
    let tempmahadata = this.state.accmahadata
    if(e.target.value===2)
    tempmahadata.sort(function(a,b) {
        let g=a.Title
        let h=b.Title
        g=g.toLowerCase();
        h=h.toLowerCase();
        return g.localeCompare(h)
    })
    if(e.target.value===3)
    tempmahadata.sort(function(a,b) {
        let g=a.Title
        let h=b.Title
        g=g.toLowerCase();
        h=h.toLowerCase();
        return h.localeCompare(g)
    })
    this.setState({accmahadata2:tempmahadata})
    // console.log(tempmahadata)
  }
  handlesortda=(e)=>{
    this.setState({soda : e.target.value,sona:"1",sora:"1",sota:"1"})
    let tempmahadata = this.state.accmahadata
    if(e.target.value===3)
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
    })
    if(e.target.value==2)
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
            return hstr.localeCompare(gstr)
    })
    this.setState({accmahadata2:tempmahadata})
    console.log(tempmahadata)
    
  }

async componentDidMount(){
    this.getjobinfo()
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



render (){
  return (
        <Container>
            <br/>
            <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">Company Name</Typography>
                <Typography variant="subtitle2">{this.state.comname}</Typography>
            </Box>
            <br/>
            <br/>

                {
                this.state.accmahadata != []
                ?
                <Box style={{padding:15,borderRadius:5}}>
                    <Paper elevation={1} style={{border:"black 1px solid"}}>
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
                    <InputLabel id="demo-simple-select-label">Sorting by Name</InputLabel>
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
                    <InputLabel id="demo-simple-select-label">Sorting by joning date</InputLabel>
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
                    <InputLabel id="demo-simple-select-label">Sorting by job title</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.sota}
                        onChange={this.handlesortta}
                    >
                        <MenuItem value={1}>None</MenuItem>
                        <MenuItem value={2}>Asc</MenuItem>
                        <MenuItem value={3}>Des</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    </Paper>

                    {/* <hr></hr> */}
                    <br/>
                    <br/>
                    <TableContainer size="small" aria-label="a dense table" component={Paper}>
                        <Table aria-label="customize table" >
                            <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                            <TableRow>
                                <TableCell style={{color:"white"}}>Applicant Name</TableCell>
                                <TableCell style={{color:"white"}} align="center">Job Title</TableCell>
                                <TableCell style={{color:"white"}} align="center">Job Type</TableCell>
                                <TableCell style={{color:"white"}} align="center">Date of Joining</TableCell>
                                <TableCell style={{color:"white"}} align="center">Rating by you*</TableCell>
                                <TableCell style={{color:"white"}} align="center">Rating**</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.accmahadata2.map((row) => (
                                <TableRow>
                                    <TableCell >{row.fname} {row.lname}</TableCell>
                                    <TableCell align="center">{row.Title}</TableCell>
                                    <TableCell align="center">{row.Jtype}</TableCell>
                                    <TableCell align="center">{row.Datejoin}</TableCell>
                                    <TableCell align="center">{
                                                ( row.LoRating === '' || row.LoRating === 0 ||  row.LoRating === "NaN" || isNaN(row.LoRating) === true ) ? <div><SplitButton2 datar={row.uid} dataj={row.JOBUSID}></SplitButton2></div>:<Rating name="half-rating-read" precision={0.5} name="read-only" value={row.LoRating} readOnly />
                                    }</TableCell>
                                    <TableCell align="center">{
                                        row.Raating === 0
                                        ?
                                        <>Not rated yet</>
                                        :
                                        <Rating name="half-rating-read" precision={0.5} name="read-only" value={row.Raating} readOnly />
                                        }</TableCell>
                                </TableRow>
                                ))}
                           
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    <br/>
                    <Typography variant="subtitle2">* Ratings shown here are ratings given by you to the applicants for corresponding job this is not an average rating</Typography>
                    <Typography variant="subtitle2">** Average rating of an applicant covering average of rating for all job (accepted ones only)  </Typography>
                </Box>
                :
                null
                }
        </Container>
  )};
}
