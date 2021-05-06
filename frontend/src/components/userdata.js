import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {Container,Box,Typography,TextField,Button,Switch} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import '../files/css/signup.css'

class UserData extends Component {
    constructor(props){
        super(props)
        this.state = {
            Firstname:localStorage.getItem("Jodar_googleapi_firstname"),
            Lastname:localStorage.getItem("Jodar_googleapi_lastname"),
            email:localStorage.getItem("Jodar_googleapi_email"),
            password:localStorage.getItem("Jodar_googleapi_password"),
            type:"a",
            checked:false,
            switched:false,
            company_name:localStorage.getItem("Jodar_googleapi_name"),
            contact_number:'NONE',
            redirect:"r",
            sign:true
        }
        this.onChange=this.onChange.bind(this)
        this.onCheck=this.onCheck.bind(this)
        this.onSwitch2=this.onSwitch2.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    onChange(event) {
        let name = event.target.name
        let value = event.target.value
        this.setState({[name]: value}, () => {
            console.log(this.state)
        })
    }
    onSwitch2(event){
        if(this.state.switched === false)
        this.setState({switched : true, type:"r"})
        else
        this.setState({switched : false, type:"a"})
    }
    onCheck(event){
        if(this.state.checked === false)
        this.setState({checked : true})
        else
        this.setState({checked : false})
    }
    onSubmit(e) {
        e.preventDefault();
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
        console.log(newUser)
        axios.post('/signup', newUser)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                if(res.data.type === "r")
                this.setState({redirect:"r"})
                if(res.data.type === "a")
                this.setState({redirect:"a"})
                window.alert(res.data.msg)
                if(res.data.status==="201"){
                    console.log(res.data.userdata._id)
                    localStorage.setItem("Jodar_id", res.data.userdata._id);
                    localStorage.setItem("Jodar_id_type", res.data.userdata.type);
                    this.setState({sign:false})
                }
                else
                window.location.reload()
            })
            .catch(err=>{
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
                                    <h1>Joining us as Applicants</h1>
                                                <Switch
                                                    checked={this.state.switched}
                                                    onChange={this.onSwitch2}
                                                    name="switched"
                                                    color="primary"
                                                />
                                                
                                                <label id="cat">Need a 's recruiter account</label>
                                    <br/>
                                    <br/>
                                                
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
                                                Confirm
                                            </Button>
                                            <br/>
                                </form> 
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
                                <h1>Joining us as Recruiter</h1>
                                                <Switch
                                                    checked={this.state.switched}
                                                    onChange={this.onSwitch2}
                                                    name="switched"
                                                    color="primary"
                                                />
                                                <label id="cat">Need a applicants's account</label>
                              
                                    <TextField
                                            variant="standard"
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="contact_number"
                                            label="Contact Number"
                                            type="contact_number"
                                            id="contact_number"
                                            onChange = {this.onChange}
                                    />
                                    <br/>
                                    <br/>
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
                                            Confirm
                                        </Button>
                            </form> 
                            </Typography>
                        </div>
                    </div>
                </Box>
            </Container>
        )
    }
    }
}



export default UserData