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
       
        }
    this.getjobinfo=this.getjobinfo.bind(this)
    this.backMA=this.backMA.bind(this)
 }
 getjobinfo = async () =>{
    const d2 = await axios.get('/getjob/'+this.state.bid)
    const sktok = d2.data.data5.Skill_Req.split(";");
    this.setState({skilltok:sktok,comname:d2.data.data5.Company_name,title:d2.data.data5.Title,deadline:d2.data.data5.Deadline,des:d2.data.data5.Descri,maxapp:d2.data.data5.Maxappli,maxpos:d2.data.data5.Maxposi,jtype:d2.data.data5.Job_Type,jdur:d2.data.data5.Job_Dura,sala:d2.data.data5.Job_Sal})
}

async componentDidMount(){
    this.getjobinfo()
}

backMA(){
    window.location.href='/dashboard'
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
        </Container>
  )};
}
