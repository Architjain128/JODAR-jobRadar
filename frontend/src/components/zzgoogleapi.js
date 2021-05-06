
  
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import axios from 'axios'
class GooLogin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            redirect : "",
        };
    }
    responseGoogle = response => {
        console.log(response)
        const { googleId, name, email } = response.profileObj;
        const newUser = {
            email: email,
            password: googleId,
            checked:true,
        }
        if(newUser)
        {
            console.log(newUser)

            axios.post('/login', newUser)
                .then(res => {
                    console.log("ok")
                    console.log(res.data)
                    if(res.data.type === "r")
                    this.setState({redirect:"r"})
                    if(res.data.type === "a")
                    this.setState({redirect:"a"})
                    window.alert(res.data.msg)
                    if(res.data.status === '201')
                    {
                        console.log(res.data.userdata._id)
                        localStorage.setItem("Jodar_id", res.data.userdata._id);
                        localStorage.setItem("Jodar_id_type", res.data.userdata.type);
                        this.setState({login:false})
                    }
                    else
                    window.location.reload()
                    this.setState({ redirectToReferrer: true });
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        else{
            alert("failed");
        }
    };

    render() {
        if (this.state.redirectToReferrer) {
            
                if(this.state.redirect === "r"){
                    return <Redirect to="/marketplace"></Redirect>
                }
                if(this.state.redirect === "a")
                {
                    return <Redirect to="/dashboard"></Redirect>
                }
        }
        else {
            return (
                <GoogleLogin
                    clientId="350226045015-6b6mlsel22edgq77dgtkbqb179gk2ng7.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            );
        }
        
    }
}

export default GooLogin;