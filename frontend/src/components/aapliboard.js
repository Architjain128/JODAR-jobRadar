import React, { Component } from 'react'
import {Container} from '@material-ui/core';
import axios from 'axios';
import Dashboard from './dashboard';



class Appliboard extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            userid:localStorage.getItem("Jodar_id"),
            data1:"####",
            data2:"ratin",
            data3:[],
            data4:[],
            dataAA:[],
            datajj:"",
            data4a:[],
            data4b:[],
            data4c:[],
            dataimg:"/pimg/noprofile.jpg",
        }
        this.getinfo = this.getinfo.bind(this);
    }
    getinfo = async () =>{
        // alert("ok")
        const d4 = await axios.get('/alledu/'+this.state.userid)
        const d3 = await axios.get('/allskill/'+this.state.userid)
        const d1 = await axios.get('/user/'+this.state.userid)
        const dimg = await axios.get('/getimg/'+this.state.userid)
        const dpdf = await axios.get('/getpdf/'+this.state.userid)
        const djj = await axios.get('/myallappliedjobs/'+this.state.userid)
        // const d4 = await axios.get('/alledu/'+this.state.userid)
        const dd1 = [];
        const dd3 = [];
        const dd4 = [];
        const ddraimgpdf = [];
        // console.log(d1.data.data1)
        var sumrating = d1.data.data1.reset_token
        var raating = d1.data.data1.expire
        if(raating===0)
        ddraimgpdf.push(0)
        else  
        ddraimgpdf.push(sumrating/raating)
        // ddimg.push(dimg.data.ra)
        ddraimgpdf.push(dimg.data.proimg)
        ddraimgpdf.push(dpdf.data.pdf)
        dd1.push(d1.data.data1.Firstname)
        dd1.push(d1.data.data1.Lastname)
        dd1.push(d1.data.data1.email)
        dd1.push(d1.data.data1.signup_time)
        for(let i=0;i<d3.data.data3.length;i++)
        {
            dd3.push(d3.data.data3[i].Spec)
        }
        for(let i=0;i<d4.data.data4.length;i++)
        {
            dd4.push({Edu:d4.data.data4[i].Edu,Edus:d4.data.data4[i].Edus,Edue:d4.data.data4[i].Edue})
        }
        this.setState({data1:dd1,data3:dd3,data4:dd4,data2:ddraimgpdf,datajj:djj.data.dalljobapplied})
    }

    async componentDidMount(){
        this.getinfo()
    }
    render() {

        return (
            <Container>
                <Dashboard data1={this.state.data1} data2={this.state.data2} data3={this.state.data3} data4={this.state.data4} datajj={this.state.datajj}></Dashboard>
            </Container>
        )
    }
}

export default Appliboard

