import React, { Component } from 'react'
import { Redirect} from 'react-router-dom';
import {Container,Box,Typography,TextField,Button} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/login.css'
import GooLogin from "./zzgoogleapi"

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            redirect:"a",
            checked:false,
            login:true,
            emailerror:false,
            emailerrormsg:null,
        }
        this.onChange=this.onChange.bind(this)
        this.onCheck=this.onCheck.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail=this.validateEmail.bind(this)


    }
    validateEmail(e){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(e.target.value) == false) 
        {
            this.setState({emailerrormsg:"Please enter valid email",emailerror:true})
            return false;
        }
        else
        {
            this.setState({emailerrormsg:null,emailerror:false})
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
    onCheck(e){
        if(this.state.checked === false)
        this.setState({checked : true})
        else
        this.setState({checked : false})

    }
    onSubmit(e) {
        e.preventDefault();
        if(this.state.emailerror === true )
        {
            alert("Please enter valid data")
            return
        }
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            checked:this.state.checked,
        }

        // console.log(newUser)
        axios.post('/login', newUser)
            .then(res => {
                // console.log("ok")
                // console.log(res.data)
                if(res.data.type === "r")
                this.setState({redirect:"r"})
                if(res.data.type === "a")
                this.setState({redirect:"a"})
                window.alert(res.data.msg)
                if(res.data.status === '201')
                {
                    // console.log(res.data.userdata._id)
                    localStorage.setItem("Jodar_id", res.data.userdata._id);
                    localStorage.setItem("Jodar_id_type", res.data.userdata.type);
                    this.setState({login:false})
                }
                else
                {
                    alert("email or password not matched ")
                    window.location.reload()
                }
            })
            .catch(err=>{
                // alert("password or email not matched")
                // window.location.reload()
                console.log(err)
            })

        this.setState({
            email: '',
            password: ''
        });
    }
    render() {

        if(!this.state.login){
            
            if(this.state.redirect === "r"){

                return <Redirect to="/marketplace"></Redirect>
            }
            if(this.state.redirect === "a")
            {
                return <Redirect to="/dashboard"></Redirect>
            }
        }

        return (
            <Container>
                <Box 
                bgcolor="grey"
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
                                <h1>User Login</h1>
                                        <TextField
                                        variant="standard"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        type="text"
                                        id="email"
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
                                        <div id="tcdiv">
                                            <input type="checkbox" checked={this.state.checked} onChange={this.onCheck} id="tandcheck"/> <p id="tc">I agree all <a href="/" id="tandc">terms and conditions.</a></p><br/>
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            id="loginbutton"
                                            // className={classes.submit}
                                            onClick = {this.onSubmit}
                                            >
                                            Login
                                        </Button>
                                        <br/>
                                        <br/>
                                        <GooLogin></GooLogin>
                            </form> 
                            <p id="nouser">Not a user? <a id="tandc" href="/signup">Sign up</a></p>
                            </Typography>
                        </div>
                    </div>
                </Box>
            </Container>
        )
    }
}

export default Login

