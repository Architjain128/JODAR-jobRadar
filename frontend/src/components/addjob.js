import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default class  AddJob extends Component {
 constructor(props)
 {
     super(props)
     let newDate = new Date()
     let date = ("0"+newDate.getDate()).slice(-2);
     let month =("0"+(newDate.getMonth() + 1)).slice(-2);
     let year = ("0"+newDate.getFullYear()).slice(-4);
     let hour = ("00"+newDate.getHours()).slice(-2);
     let minite = ("00"+newDate.getMinutes()).slice(-2)
     let datata=`${date}/${month}/${year} ${hour}:${minite}`
     this.state={
         comname:this.props.data1[0],
         email:this.props.data1[2],
         ondate:datata,
         jodar_id:localStorage.getItem('Jodar_id'),
         title:"",
         des:"",
         maxapp:"",
         maxpos:"",
         deadline:"",
         jtype:"1",
         jdur:"7",
         sala:"",
         skilltok:"",
         dateerr:false,
         dateerrmsg:null,
         numerr:false,
         numerrmsg:null,
         num2err:false,
         num2errmsg:null,
         num3err:false,
         num3errmsg:null,
        }
    this.onChange=this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.validatenum = this.validatenum.bind(this);
    this.validatenum2 = this.validatenum2.bind(this);
    this.validatenum3 = this.validatenum3.bind(this);
 }
 onChange(event) {
    let name = event.target.name
    let value = event.target.value
    this.setState({[name]: value}, () => {
        // console.log(this.state)
    })
} 
validateDate(e){
    var reg =/^([0-2][0-9]|[0-3][0-1])\/([0][0-9]|[1][1-2])\/([0-9]{4})\s([0][0-9]|[1][0-9]|[2][0-3]):([0-5][0-9])$/;
    if (reg.test(e.target.value) === false) 
    {
        this.setState({dateerrmsg:"Please enter valid date (DD/MM/YYYY hh:mm) (24 hour format)",dateerr:true})
    }
    else
    {
        this.setState({dateerrmsg:null,dateerr:false})
    }
}
validatenum(e){
    if (isNaN(e.target.value)===true || parseInt(e.target.value)>200000 || parseInt(e.target.value)<1 || e.target.value==='') 
    {
        this.setState({numerrmsg:"value must be a whole number",numerr:true})
    }
    else
    {
        this.setState({numerrmsg:null,numerr:false})
    }
}

validatenum2(e){
    var reg =/^[1-9]\d*$/;
    if (reg.test(e.target.value) === false) 
    {
        this.setState({num2errmsg:"value must be a whole number",num2err:true})
    }
    else
    {
        this.setState({num2errmsg:null,num2err:false})
    }
}
validatenum3(e){
    var reg =/^[1-9]\d*$/;
    if (reg.test(e.target.value) === false) 
    {
        this.setState({num3errmsg:"value must be a whole number",num3err:true})
    }
    else
    {
        this.setState({num3errmsg:null,num3err:false})
    }
}
onSubmit(e) {
    e.preventDefault();
    if(this.state.dateerr === true ||this.state.numerr === true ||this.state.num2err === true ||this.state.num3err === true || parseInt(this.state.maxpos) >= parseInt(this.state.maxapp) )
    {
        alert("Please enter valid data *(Max application >= max position)")
        return
    }
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

    // console.log(newJob)
    axios.post('/addjob', newJob)
        .then(res => {
            // console.log("ok")
            // console.log(res.data)
            if(res.data.status === '201')
            {
                alert("ok add")
                window.location.reload()
            }
            else
            {
                alert("Error")
                window.location.reload()
            }
        })
        .catch(err=>{
            // alert("Ooops something gone wrong")
            window.location.reload()
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
        skilltok:""
    });
}

render (){
  return (
      <Container>
          <br/>
            
          <br/>
          <Typography variant="h4">Fill Form To Create Job Listing </Typography>

          <br/>

        {/* <FormControl fullWidth > */}
        <TextField required fullWidth id="standard-basic" label="Job Title" name="title" onChange = {this.onChange}/>
        <br/>
        <br/>
        <TextField required fullWidth id="standard-basic" multiline label="Description" name="des"onChange = {this.onChange}/>
        <br/>
        <br/>
        <TextField required fullWidth id="standard-basic" 
            error = {this.state.num2err}
            helperText = {this.state.num2errmsg}
            onBlur = {this.validatenum2}
        label="Max Applicant" name="maxapp" onChange = {this.onChange}/>
        <br/>
        <br/>
        <TextField required fullWidth id="standard-basic" 
            error = {this.state.num3err}
            helperText = {this.state.num3errmsg}
            onBlur = {this.validatenum3}
        label="Max Postions" name="maxpos" onChange = {this.onChange}/>
        <br/>
        <br/>
        <TextField required fullWidth 
         error = {this.state.numerr}
         helperText = {this.state.numerrmsg}
         onBlur = {this.validatenum}
        id="standard-basic" label="Salary" onChange = {this.onChange} name="sala"/>
        <FormHelperText>per month (0&lt;salary&lt;200000)</FormHelperText>

        <br/>
        <br/>
        <NativeSelect required fullWidth label="Job Type" name="jtype" value={this.state.jtype} onChange = {this.onChange} textAlign='left' id="demo-simple-select-placeholder-label"  displayEmpty
        //   className={classes.selectEmpty}
        >
          {/* <option value={1}>Choose Job Type</option> */}
          <option value={1}>Full Time</option>
          <option value={2}>Part Time</option>
          <option value={3}>Work From Home</option>
        </NativeSelect>
        <FormHelperText>Default Job Type is Full Time</FormHelperText>

        <br/>
       
        <NativeSelect required fullWidth label="Job Duration" name="jdur" value={this.state.jdur} onChange = {this.onChange} textAlign='left' id="demo-simple-select-placeholder-label"  displayEmpty
        //   className={classes.selectEmpty}
        >
          {/* <option value={}>Choose Job Duration</option> */}
          <option value={7}>Indefined</option>
          <option value={1}>1 month</option>
          <option value={2}>2 months</option>
          <option value={3}>3 months</option>
          <option value={4}>4 months</option>
          <option value={5}>5 months</option>
          <option value={6}>6 months</option>
        </NativeSelect>
        <FormHelperText>Default Job Type is Indefined</FormHelperText>        
        <br/>
        <TextField 
        required 
        error = {this.state.dateerr}
        helperText = {this.state.dateerrmsg}
        onBlur = {this.validateDate}
        fullWidth id="standard-basic" label="Deadline" name="deadline"onChange = {this.onChange}/>
        <FormHelperText> "DD/MM/YYYY hh:mm" (24 hour format) only</FormHelperText>
        <br/>
        <TextField required fullWidth id="standard-basic" label="Skills" onChange = {this.onChange} name="skilltok" />
        <FormHelperText>Add multiple skill by seprating them through semicolon (;)</FormHelperText>
        <br/>
        <br/>
        <Button variant="contained" color="primary" onClick = {this.onSubmit} >Create</Button>

        {/* </FormControl> */}
        <br/>
        <br/>
        <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">By Company Name</Typography>
                <Typography variant="subtitle2">{this.props.data1[0]}</Typography>
            </Box>
          <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">From Email</Typography>
                <Typography variant="subtitle2">{this.props.data1[2]}</Typography>
            </Box>
          <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption"> On Date</Typography>
                <Typography variant="subtitle2">{this.state.ondate}</Typography>
            </Box>
    </Container>
  )};
}
