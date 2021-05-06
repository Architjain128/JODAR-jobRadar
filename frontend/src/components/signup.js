import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/signup.css'
import GooSignin from "./zzgoogleapi2"

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            Firstname:'',
            Lastname:'',
            email:'',
            password:'',
            type:"a",
            checked:false,
            switched:false,
            company_name:'NONE',
            contact_number:'NONE',
            redirect:"r",
            sign:true,
            emailerror:false,
            emailerrormsg:null,
            numerror:false,
            numerrormsg:null,
        }
        this.onChange=this.onChange.bind(this)
        this.onCheck=this.onCheck.bind(this)
        this.onSwitch=this.onSwitch.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
        this.validateEmail=this.validateEmail.bind(this)
        this.validateCompanynum=this.validateCompanynum.bind(this)
    }
    validateEmail(e){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(e.target.value) === false) 
        {
            this.setState({emailerrormsg:"Please enter valid email",emailerror:true})
        }
        else
        {
            this.setState({emailerrormsg:null,emailerror:false})
        }
    }
    validateCompanynum(e){
        var reg = /^[0-9]{6,10}$/;
        if (reg.test(e.target.value) === false) 
        {
            this.setState({numerrormsg: "Please enter valid number (length between 6-10 and all whole numbers)",numerror:true})
            return false;
        }
        else
        {
            this.setState({numerrormsg:null,numerror:false})
            return true;
        }
    }

    onChange(event) {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value}, () => {
            // console.log(this.state)
        })
    }
    onSwitch(event){
        if(this.state.switched === false)
        this.setState({switched : true, type:"r", company_name:"",contact_number:""})
        else
        this.setState({switched : false, type :"a", company_name:"NONE", contact_number:"NONE"})
        
    }
    onCheck(event){
        if(this.state.checked === false)
        this.setState({checked : true})
        else
        this.setState({checked : false})
    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.emailerror === true || this.state.numerror === true)
        {
            alert("Please enter valid data")
            return
        }
        const newUser = {
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            email: this.state.email,
            password: this.state.password,
            checked:this.state.checked,
            type: this.state.type,
            company_name:this.state.company_name,
            contact_number:this.state.contact_number,
        }
        // console.log(newUser)
        axios.post('/signup', newUser)
            .then(res => {
                // console.log("ok")
                // console.log(res.data)
                if(res.data.type === "r")
                this.setState({redirect:"r"})
                if(res.data.type === "a")
                this.setState({redirect:"a"})
                window.alert(res.data.msg)
                if(res.data.status==="201"){
                    // console.log(res.data.userdata._id)
                    localStorage.setItem("Jodar_id", res.data.userdata._id);
                    localStorage.setItem("Jodar_id_type", res.data.userdata.type);
                    this.setState({sign:false})
                }
                else{
                    alert("Ooops something gone wrong")
                    window.location.reload()
                }
            })
            .catch(err=>{
                // window.location.reload()
                console.log(err)
            })

        this.setState({
            Firstname:'',
            Lastname:'',
            email:'',
            password:'',
            type:"a",
            checked:false,
            switched:false,
            company_name:'NONE',
            contact_number:'NONE',
            sign:true
        });
    }

    render() {
        if(!this.state.sign)
        {
            if(this.state.redirect === "a")
            return <Redirect to="/dashboard"></Redirect>
            if(this.state.redirect === "r")
            return <Redirect to="/marketplace"></Redirect>
        }
        if(!this.state.switched)
        {
            return (
                <Container>
                    <Box 
                    bgcolor="white"
                    boxShadow="10"
                    borderColor="black"
                    borderRadius="15px"
                    textAlign="center"
                    p='30px'
                    mt='50px'
                    >
                        <div>
                            <AccountCircle id="loginicon" />
                            <div id="logincontainer">
                                <Typography component="div" id="logintypo" >
                                <form onSubmit={this.onSubmit}>
                                    <br/>
                                    <h1>Join us as Applicants</h1>
                                                <Switch
                                                    checked={this.state.switched}
                                                    onChange={this.onSwitch}
                                                    name="switched"
                                                    color="primary"
                                                />
                                                <label id="cat">Need a 's recruiter account</label>
                                                
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="Firstname"
                                                label="First Name"
                                                type="text"
                                                id="Firstname"
                                                onChange = {this.onChange}
                                            />
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="Lastname"
                                                label="Last Name"
                                                type="text"
                                                id="Lastname"
                                                onChange = {this.onChange}
                                            />
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="email"
                                                label="E-Mail"
                                                type="text"
                                                id="email"
                                                // autoComplete
                                                error = {this.state.emailerror}
                                                helperText = {this.state.emailerrormsg}
                                                onBlur = {this.validateEmail}
                                                onChange = {this.onChange}
                                            />

                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                // autoComplete
                                                onChange = {this.onChange}
                                            />
                                            <div id="tcdiv">
                                                <input type="checkbox" onChange={this.onCheck} checked={this.state.checked} id="tandcheck"/> <p id="tc">I agree all <a href="https://pastebin.com/embed_js/KjwiiUhG" target="blank" id="tandc">terms and conditions.</a></p><br/>
                                            </div>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                id="signupbutton"
                                                onClick = {this.onSubmit}
                                                >
                                                Sign Up
                                            </Button>
                                            <br/>
                                            <br/>
                                            <GooSignin></GooSignin>
                                    {/* <input type="submit" id="loginbutton" value="Login" /> */}
                                </form> 
                                <p id="nouser">Already a user? <a id="tandc" href="/login">Login</a></p>
                                </Typography>
                            </div>
                        </div>
                    </Box>
                </Container>
            )
    }
    if(this.state.switched)
    {
        return (
            <Container>
                <Box 
                bgcolor="white"
                boxShadow="10"
                borderColor="black"
                borderRadius="15px"
                textAlign="center"
                p='30px'
                mt='50px'
                >
                    <div>
                        <AccountCircle id="loginicon" />
                        <div id="logincontainer">
                            <Typography component="div" id="logintypo" >
                            <form onSubmit={this.onSubmit}>
                                <br/>
                                <h1>Join us as Recruiter</h1>
                                                <Switch
                                                    checked={this.state.switched}
                                                    onChange={this.onSwitch}
                                                    name="switched"
                                                    color="primary"
                                                />
                                                <label id="cat">Need a applicants's account</label>
                                                
                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="email"
                                            label="E-Mail"
                                            type="text"
                                            id="email"
                                            // autoComplete
                                            error = {this.state.emailerror}
                                            helperText = {this.state.emailerrormsg}
                                            onBlur = {this.validateEmail}
                                            onChange = {this.onChange}
                                        />
                                        <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            onChange = {this.onChange}
                                        />
                                    <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="company_name"
                                            label="Company Name"
                                            type="company_name"
                                            id="company_name"
                                            onChange = {this.onChange}
                                    />
                                    <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="contact_number"
                                            label="Contact Number"
                                            type="contact_number"
                                            id="contact_number"
                                            error = {this.state.numerror}
                                            helperText = {this.state.numerrormsg}
                                            onBlur = {this.validateCompanynum}
                                            onChange = {this.onChange}
                                    />
                                        <div id="tcdiv">
                                            <input type="checkbox" onChange={this.onCheck} checked={this.state.checked}  id="tandcheck"/> <p id="tc">I agree all <a href="https://pastebin.com/embed_js/KjwiiUhG" target="blank" id="tandc">terms and conditions.</a></p><br/>
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            id="signupbutton"
                                            // className={classes.submit}
                                            onClick = {this.onSubmit}
                                            >
                                            Sign Up
                                        </Button>
                                        <br/>
                                        <br/>
                                        <GooSignin></GooSignin>

                            </form> 
                            <p id="nouser">Already a user? <a id="tandc" href="/login">Login</a></p>
                            </Typography>
                        </div>
                    </div>
                </Box>
            </Container>
        )
    }
    }
}



export default Signup