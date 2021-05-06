
  
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";

class GooSignin extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false
        };
    }
    responseGoogle = response => {
        console.log(response)
        const { googleId, name, email, familyName , givenName } = response.profileObj;
        const user = {
            password: googleId,
            name: name,
            email: email,
        };
        console.log(user)
        if(user)
        {
            localStorage.setItem("Jodar_googleapi_firstname",givenName)
            localStorage.setItem("Jodar_googleapi_lastname",familyName)
            localStorage.setItem("Jodar_googleapi_name",name)
            localStorage.setItem("Jodar_googleapi_email",email)
            localStorage.setItem("Jodar_googleapi_password",googleId)
            this.setState({ redirectToReferrer: true });
        }
        
    };

    render() {
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to="/userdata"></Redirect>
        }
        else {
            return (
                <GoogleLogin
                    clientId="350226045015-6b6mlsel22edgq77dgtkbqb179gk2ng7.apps.googleusercontent.com"
                    buttonText="Sign up with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            );
        }
        
    }
}

export default GooSignin;