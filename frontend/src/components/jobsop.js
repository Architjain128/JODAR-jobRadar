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
import { FormatAlignJustify } from '@material-ui/icons';

export default class Dashyy extends Component {
 constructor(props)
 {
     super(props)
     this.state={
         bid:localStorage.getItem('Jodar_jobapp'),
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
         stateofpur:"",
         applybutton:false,
         button:false,
        }
    this.getjobinfo=this.getjobinfo.bind(this)
    this.onapplyjob=this.onapplyjob.bind(this)
    this.backMA=this.backMA.bind(this)
    this.handleChange=this.handleChange.bind(this)
 }
 getjobinfo = async () =>{
    const d2 = await axios.get('/getjob/'+this.state.bid)
    const dap = await axios.get('/myappli/'+this.state.jodar_id)
    // const dac = await axios.get('/myapplicur/'+this.state.jodar_id)
    const reappli=dap.data.dap
    // const reappcu=dac.data.dac

    if(reappli>=10 )
    {
        alert("Can't apply due to your max open application limit reached")
        window.location.href='/dashboard'
    }

    const sktok = d2.data.data5.Skill_Req.split(";");
    this.setState({skilltok:sktok,comname:d2.data.data5.Company_name,title:d2.data.data5.Title,deadline:d2.data.data5.Deadline,des:d2.data.data5.Descri,maxapp:d2.data.data5.Maxappli,maxpos:d2.data.data5.Maxposi,jtype:d2.data.data5.Job_Type,jdur:d2.data.data5.Job_Dura,sala:d2.data.data5.Job_Sal})
}

async componentDidMount(){
    this.getjobinfo()
}

backMA(){
    window.location.href='/dashboard'
}
handleChange = (event) => {
    let value = event.target.value
    this.setState({stateofpur: value}, () => {
        console.log(this.state)
    })
};

onapplyjob(e){
    e.preventDefault();
    let okokok=false
    let newDate = new Date()
    let adate = newDate.getDate();
    let amonth = newDate.getMonth() + 1;
    let ayear = newDate.getFullYear();
    let ahour = newDate.getHours();
    let aminutes = newDate.getMinutes();
    let deadd=this.state.deadline.split(" ");
    let datede = deadd[0].split("/");
    let timede = deadd[1].split(":");
    
    if(parseInt(datede[2]) >= parseInt(ayear))
    {
      okokok = true
    }
    else
    {
        if(parseInt(datede[1]) >= parseInt(amonth))
        {
            okokok = true

        }
        else
        {
          if(parseInt(datede[0]) >= parseInt(adate))
          {
            okokok = true
            
          }
          else
          {
            if(parseInt(timede[0]) >= parseInt(ahour))
            {
                okokok = true

            }
            else
            {
              if(parseInt(timede[1]) >= parseInt(aminutes))
              {
                okokok = true
                  
              }
            }
          }
        }
    }

    if(okokok===false)
    {
        alert("Can't apply due to deadline")
    }
    else
    {
        let datee = new Date();
        let dated = ("0" + datee.getDate()).slice(-2);
        let month = ("0"+(datee.getMonth() +1)).slice(-2) ;
        let yeard = ("0"+datee.getFullYear()).slice(-4);
        let horus = ("00"+datee.getHours()).slice(-2);
        let minite = ("00"+datee.getMinutes()).slice(-2);
        let dtstr = dated + "/" + month + "/" + yeard + " "+horus + ":" + minite
        const newlistjob = {
            JobId : this.state.bid,
            UserId : this.state.jodar_id,
            Company_name : this.state.comname,
            Title : this.state.title,
            Datejoon : dtstr,
            Datejoin : "None",
            Job_Sal : this.state.sala,
            Rating : 0 ,
            Status : "pending",
            Sop:this.state.stateofpur,
        }
        console.log(newlistjob)

        axios.post('/jobindash', newlistjob)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                if(res.data.status==="201"){
                    alert("applied")
                    window.location.href="/dashboard"
                }
                else{
                    alert(res.data.msg)
                window.location.reload()
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

render (){

  return (
        <Container>
            <br/>
            <Button onClick={this.backMA} color="primary" variant="contained">Back to Dashboard</Button>
        
            <br/>
            <br/>
            <Paper elevation={3} >
                <Typography variant="h4"><b>Recrutier </b>{this.state.comname}</Typography><br/>
                <Typography variant="h5">{this.state.title}</Typography><br/>
                <Typography variant="body1"><b>Deadline</b> {this.state.deadline}</Typography><br/>
                <Typography variant="body2">{this.state.des}</Typography><br/><Divider variant="middle" />
                <Typography variant="overline"><b>Max applications</b> {this.state.maxapp}</Typography><br/>
                <Typography variant="overline"><b>Max positions</b> {this.state.maxpos}</Typography><br/>
                <Typography variant="overline"><b>Skills Required </b> {this.state.skilltok.map(name => (<Chip variant="outlined" color="default" size="small" label={name} />))}</Typography><br/>
                <Typography variant="overline"><b>Salary</b> {this.state.sala}</Typography><br/><Divider variant="middle" />
                <Typography variant="overline"><b>Job Type  </b> 
                { 
                    this.state.jtype===1 ? <>Full Time</> : this.state.jtype===2 ? <>Part Time</> :this.state.jtype===3 ? <>Work From Home</> : null
                }
                </Typography><br/>
                <Typography variant="overline"><b>Job Duration </b> 
                {
                    this.state.jdur === 1 ? <>1 month</> : this.state.jdur === 2 ? <>2 months</> :this.state.jdur === 3 ? <>3 months</> :this.state.jdur === 4 ? <>4 months</> : this.state.jdur === 5 ? <>5 months</> : this.state.jdur === 6 ? <>6 months</> : <>Indefinite</>
                }
                </Typography><br/>
                <Typography variant="overline"><b>Rating</b> {this.state.points}</Typography><br/>

            </Paper>
            <br/>
            <br/>

            <Paper>
                <br/>
                <Typography variant="body2">enter statement of purpose in textbox and smash apply</Typography>
                <br/>
                <br/>
                <TextField variant="outlined"  multiline inputProps={{ maxLength: 250 }} label="Not more than 250 words" name="soppp" onChange={this.handleChange}></TextField>
                <br/>
                <br/>
                    <Button onClick={this.onapplyjob} color="primary"  variant="contained">Apply</Button> 
                <br/>
                <br/>
            </Paper>
    
            <br/>
            <br/>

        </Container>
  )};
}
