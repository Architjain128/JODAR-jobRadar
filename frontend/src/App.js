import React from 'react'
import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landing';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Marketplace from './components/marketplace';
import Recprofile from './components/recprofile';
import Appprofile from './components/appprofile';
import Appliboard from './components/aapliboard';
import Recliboard from './components/recliboard';
import Dashyy from "./components/recappdash";
import Jobsop from "./components/jobsop";
import Jobsee from "./components/jobsee";
import UserData from "./components/userdata";
import SplitButton from "./components/buttongrp";
import Heart from "./files/images/he.png";

const Footer = () => (
  <div className="footer" style={{position:'fixed',backgroundColor:"rgb(176,203,232)",bottom:0,width:"100%",height:"auto"}}>
    <p style={{position:'fixed',backgroundColor:"rgb(176,203,232)",bottom:0,left:0,padding:'1px'}}class="love">Made with <img src={Heart} alt="love" style={{height:"20px"}}/> by <a href="https://architjain128.github.io" style={{textDecoration: 'none',fontWeight:"bolder"}} >Archit Jain</a></p>
    <p style={{position:'fixed',backgroundColor:"rgb(176,203,232)",bottom:0,right:0,padding:'1px'}}><a href="https://architjain128.github.io" style={{textDecoration: 'none',fontWeight:"bolder"}} >Vist my website</a></p>
  </div>
);



function App() {
  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LandingPage} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/signup" component={Signup} exact/>
            <Route path="/dashboard" component={Appliboard} exact/>
            <Route path="/marketplace" component={Recliboard} exact/>
            <Route path="/appdash" component={Dashboard} exact/>
            <Route path="/recdash" component={Marketplace} exact/>
            <Route path="/recpro" component={Recprofile} exact/>
            <Route path="/apppro" component={Appprofile} exact/>
            <Route path="/joblist" component={Dashyy} exact/>
            <Route path="/applyjob" component={Jobsop} exact/>
            <Route path="/seejob" component={Jobsee} exact/>
            <Route path="/userdata" component={UserData} exact/>
            <Route path="/test" component={SplitButton} exact/>
          </Switch>
        </BrowserRouter>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
