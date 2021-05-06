import React, { Component } from 'react'
import { Redirect} from 'react-router-dom';
import {Container,Box,Typography,TextField,Button} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons'
import axios from 'axios';
import Marketplace from './marketplace';



class Recliboard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            userid:localStorage.getItem("Jodar_id"),
            data1:"",
            data2:[],
            dataimg:"",
        }
        this.getinfo = this.getinfo.bind(this);
    }
    getinfo = async () =>{
        // alert("ok")
        const d1 = await axios.get('/user/'+this.state.userid)
        const d2 = await axios.get('/bio/'+this.state.userid)
        const dimg = await axios.get('/getimg/'+this.state.userid)
        const dd1 = [];
        const dd2 = [];
        dd1.push(d1.data.data1.company_name)
        dd1.push(d1.data.data1.contact_number)
        dd1.push(d1.data.data1.email)
        dd1.push(d1.data.data1.signup_time)
        console.log(d2)
        dd2.push(d2.data.data2.Bio)
        this.setState({data1:dd1,data2:dd2,dataimg:dimg.data.proimg})
    }

    async componentDidMount(){
        this.getinfo()
    }
    render() {

        return (
            <Container>
                <Marketplace data1={this.state.data1} data2={this.state.data2} dataimg={this.state.dataimg} ></Marketplace>
            </Container>
        )
    }
}

export default Recliboard

