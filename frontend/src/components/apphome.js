import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import DataTableh from './apphometable'

export default class  Apphome extends Component {
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
         datagetjob:"",
         datarar:"",
         dataall:"",
         dataacc:"",
         datajj:this.props.datajj,
         namemy:this.props.data1[0],
         email:'',
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
        }

    this.getalljob2info=this.getalljob2info.bind(this)
 }

 getalljob2info = async () =>{
    const d1 = await axios.get('/alljobposted')
    const dall = await axios.post('/allapp')
    const dacc = await axios.post('/acceptedapp')
    const drar = await axios.get('/jobratins')
    
    console.log(dall)
    console.log(dacc)
    console.log(d1)
    console.log(drar)
    this.setState({datarar:drar.data.allratedjob,datagetjob:d1.data.dataAA,dataall:dall.data.dataallapp,dataacc:dacc.data.acceptedapp})
}

async componentDidMount(){
    this.getalljob2info()
}

render (){
  return (
      <Container>
        <br/>
            <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">Viewing as</Typography>
                <Typography variant="subtitle2">{this.state.namemy}</Typography>
            </Box>
        <br/>
        <Typography variant="h4">All Jobs</Typography>
        <br/>
        <DataTableh datagetjob={this.state.datagetjob} datajj={this.state.datajj}  dataall={this.state.dataall}  datarar={this.state.datarar} dataacc={this.state.dataacc} ></DataTableh>
    </Container>
  )};
}
