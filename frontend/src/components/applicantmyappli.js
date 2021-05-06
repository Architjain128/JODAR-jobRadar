import React, { Component } from 'react'
import {Container} from '@material-ui/core';
import {Typography,Paper} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating'
import Chip from '@material-ui/core/Chip';
import SplitButton from "./buttongrp";

class Mydashappli extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            userid:localStorage.getItem("Jodar_id"),
            appliedjob:[],
            workingjob:[],
            rejectedjob:[],
            // ratingoptions : [<><FS/><ES/><ES/><ES/><ES/></>,<><FS/><FS/><ES/><ES/><ES/></>,<><FS/><FS/><FS/><ES/><ES/></>,<><FS/><FS/><FS/><FS/><ES/></>,<><FS/><FS/><FS/><FS/><FS/></>]
        }
        this.getinfo = this.getinfo.bind(this);
        this.rateitnow = this.rateitnow.bind(this);
    }
    getinfo = async () =>{
        console.log(this.props.datajj)
        const appliedjobvar = [];
        const workingjobvar = [];
        const rejectedjobvar = [];
        for(let i=0;i<this.props.datajj.length;i++)
        {
            const p = this.props.datajj[i]
            const pa = {jobid:p["JobId"],userid:p["UserId"],Title:p["Title"],RecName:p["Company_name"],Rating:p["Rating"],Salary:p["Job_Sal"],Datejoon:p["Datejoon"],Datejoin:p["Datejoin"],Status:p["Status"]}
            if(pa.Rating === 0)pa.Rating = "NaN"
            if(pa.Status === "pending" || pa.Status === "shortlisted" || pa.Status === "shortlist")appliedjobvar.push(pa)
            if(pa.Status === "rejected")rejectedjobvar.push(pa)
            if(pa.Status === "accepted")workingjobvar.push(pa)
        }
        // const pa = {jobid:"1",userid:"2",Title:"aa",RecName:"bb",Rating:0,Salary:5000,Datejoon:"12/02/2021 23:55",Datejoin:"12/02/2021 23:55",Status:"p"}
        // const pat = {jobid:"2",userid:"2",Title:"aa",RecName:"bb",Rating:0,Salary:5000,Datejoon:"12/02/2021 23:55",Datejoin:"12/02/2021 23:55",Status:"p"}
        // workingjobvar.push(pa)
        // workingjobvar.push(pat)
        this.setState({appliedjob:appliedjobvar,workingjob:workingjobvar,rejectedjob:rejectedjobvar})
    }
    rateitnow = (val,idten)=>{
        // console.log(event.target.id)
        // console.log(event.target.value)
        console.log(val)
    }
    async componentDidMount(){
        this.getinfo()
    }
    render() {
     
        return (
            <Container>
                <Paper elevation={3}>
                    <br/>
                        <Typography>My Accepted Jobs</Typography>
                        <br/>
                        <TableContainer style={{padding:50}}>
                            <Table  aria-label="customize table">
                                <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                <TableRow>
                                    <TableCell style={{color:"white"}} align="left">Title</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Date of join</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Recruiter</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Salary</TableCell>
                                    <TableCell style={{color:"white"}} align="right">Rated By You</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.workingjob.map((row) => (
                                    <TableRow>
                                        <TableCell align="left">{row.Title}</TableCell>
                                        <TableCell align="center">{row.Datejoin}</TableCell>
                                        <TableCell align="center">{row.RecName}</TableCell>
                                        <TableCell align="center">{row.Salary}</TableCell>
                                        <TableCell align="right">
                                            {
                                                (row.Rating === "NaN" || row.Rating === 0) ? <div><SplitButton datar={row.jobid}></SplitButton></div>:<Rating name="half-rating-read" precision={0.5} name="read-only" value={row.Rating} readOnly />
                                            }
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                    {
                                    !this.state.workingjob.length &&
                                    <TableRow>
                                        <TableCell align="left"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center" ><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>
                            </TableContainer>
                        <br/>
                    <br/>
                </Paper>
                <br/>
                <Paper elevation={3}>
                    <br/>
                        <Typography>My Applied Jobs</Typography>
                        <br/>
                        <TableContainer style={{padding:50}}>
                            <Table  aria-label="customize table">
                                <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                <TableRow>
                                    <TableCell style={{color:"white"}} align="left">Title</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Applied on</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Recruiter</TableCell>
                                    <TableCell style={{color:"white"}}  align="right">Salary</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.appliedjob.map((row) => (
                                    <TableRow>
                                        <TableCell align="left">{row.Title}</TableCell>
                                        <TableCell align="center">{row.Datejoon}</TableCell>
                                        <TableCell align="center">{row.RecName}</TableCell>
                                        <TableCell  align="right">{row.Salary}</TableCell>
                                    </TableRow>
                                    ))}
                                    {
                                    !this.state.appliedjob.length && 
                                    <TableRow>
                                        <TableCell align="left"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell  align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>
                            </TableContainer>
                        <br/>
                    <br/>
                </Paper>
                <br/>
                <Paper elevation={3}>
                    <br/>
                        <Typography>My Rejected Jobs</Typography>
                        <br/>
                        <TableContainer style={{padding:50}}>
                            <Table  aria-label="customize table">
                                <TableHead style={{backgroundColor:"rgb(63,81,181)"}}>
                                <TableRow>
                                    <TableCell style={{color:"white"}} align="left">Title</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Applied on</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Rejected on</TableCell>
                                    <TableCell style={{color:"white"}} align="center">Recruiter</TableCell>
                                    <TableCell style={{color:"white"}} align="right">Salary</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rejectedjob.map((row) => (
                                    <TableRow>
                                        <TableCell align="left">{row.Title}</TableCell>
                                        <TableCell align="center">{row.Datejoon}</TableCell>
                                        <TableCell align="center">{row.Datejoin}</TableCell>
                                        <TableCell align="center">{row.RecName}</TableCell>
                                        <TableCell  align="right">{row.Salary}</TableCell>
                                    </TableRow>
                                    ))}
                                    {
                                    !this.state.rejectedjob.length && 
                                    <TableRow>
                                        <TableCell align="left"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell align="center"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                        <TableCell  align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>
                            </TableContainer>
                        <br/>
                    <br/>
                </Paper>
            </Container>
        )
    }
}

export default Mydashappli

