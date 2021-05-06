import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import DataTable2 from './apptable'


export default class  Applicationlist extends Component {
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
         dataalljob:"",
         comname:this.props.data1[0],
         email:this.props.data1[2],
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
    this.getalljobinfo=this.getalljobinfo.bind(this)
 }

 getalljobinfo = async () =>{
    const d1 = await axios.get('/alljob/'+this.state.jodar_id)
    console.log(d1.data.data1)
    this.setState({dataalljob:d1.data.data1})
}

async componentDidMount(){
    this.getalljobinfo()
}

render (){
  return (
      <Container>
        <br/>
            <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px'}}>
                <Typography variant="caption">Company Name</Typography>
                <Typography variant="subtitle2">{this.props.data1[0]}</Typography>
            </Box>
        <br/>
        <Typography variant="h4">My Created Jobs</Typography>
        <br/>
        <DataTable2 dataalljob={this.state.dataalljob}></DataTable2>
    </Container>
  )};
}
