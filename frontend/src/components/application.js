import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import DataTable from './rectable'


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
         jtype:"Full Time",
         jdur:"Indefinite",
         sala:"",
         skilltok:"",
        }
    // this.onChange=this.onChange.bind(this)
    // this.onSubmit = this.onSubmit.bind(this)
    this.getalljobinfo=this.getalljobinfo.bind(this)

 }

 getalljobinfo = async () =>{
    const d1 = await axios.get('/alljob/'+this.state.jodar_id)
    const tt1 = await axios.post('/allapp')
    const tt2 = await axios.post('/acceptedapp')
    console.log(tt1)
    console.log(tt2)
    console.log(d1.data.data1)
    const zzapdata = [];
    let allapp = new Map();
    for(let i=0;i<tt1.data.dataallapp.length;i++)
    {
        const p = tt1.data.dataallapp[i]
        allapp.set(p["_id"], p["total"]);
    }
    let accapp = new Map();
    for(let i=0;i<tt2.data.acceptedapp.length;i++)
    {
        const p = tt2.data.acceptedapp[i]
        accapp.set(p["_id"], p["total"]);
    }
    for(let i=0;i<d1.data.data1.length;i++)
    {
        const pp = d1.data.data1[i];
        const pa = {cpos:"",capp:"",Status:pp["Status"],_id:pp["_id"],UserId:pp["UserId"],Company_name:pp["Company_name"],email:pp["email"],Title:pp["Title"],Descri:pp["Descri"],Maxappli:pp["Maxappli"],Maxposi: pp["Maxposi"],Deadline:pp["Deadline"],Job_Type:pp["Job_Type"],Job_Dura: pp["Job_Dura"],Job_Sal:pp["Job_Sal"],Skill_Req: pp["Skill_Req"],Rating: pp["Rating"],sumRating:pp["sumRating"],Ondate:pp["Ondate"]}
        let temp = allapp.get(pp["_id"])
        if(temp===null||isNaN(temp))temp=0
        pa.capp = pa.Maxappli - temp
        temp = accapp.get(pp["_id"])
        if(temp===null||isNaN(temp))temp=0
        pa.cpos = pa.Maxposi - temp

        zzapdata.push(pa)
    }
    const t =[
        {
          "Status": "pending",
          "_id": "600d2b596d3ad7038542fb08",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "Test 2 ",
          "Descri": "scf",
          "Maxappli": 10,
          "Maxposi": 1,
          "Deadline": "12/02/2021 23:55",
          "Job_Type": 1,
          "Job_Dura": 7,
          "Job_Sal": 12,
          "Skill_Req": "vafv",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2b816d3ad7038542fb09",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "test 3",
          "Descri": "rgrg",
          "Maxappli": 20,
          "Maxposi": 5,
          "Deadline": "10/02/2021 23:55",
          "Job_Type": 3,
          "Job_Dura": 3,
          "Job_Sal": 5600,
          "Skill_Req": "ag",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2bab6d3ad7038542fb0a",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "test 4",
          "Descri": "arrg",
          "Maxappli": 50,
          "Maxposi": 10,
          "Deadline": "28/01/2021 23:55",
          "Job_Type": 2,
          "Job_Dura": 5,
          "Job_Sal": 89654,
          "Skill_Req": "arg",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2bde6d3ad7038542fb0b",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "test 5 ",
          "Descri": "tqg",
          "Maxappli": 10,
          "Maxposi": 1,
          "Deadline": "31/01/2021 23:55",
          "Job_Type": 2,
          "Job_Dura": 6,
          "Job_Sal": 12,
          "Skill_Req": "qrg",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2c126d3ad7038542fb0c",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "at 6",
          "Descri": "aefg",
          "Maxappli": 10,
          "Maxposi": 1,
          "Deadline": "30/01/2021 23:55",
          "Job_Type": 2,
          "Job_Dura": 3,
          "Job_Sal": 889,
          "Skill_Req": "ser",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2c3a6d3ad7038542fb0d",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "fzs 7",
          "Descri": "RG",
          "Maxappli": 70,
          "Maxposi": 8,
          "Deadline": "15/02/2021 23:55",
          "Job_Type": 1,
          "Job_Dura": 1,
          "Job_Sal": 8463,
          "Skill_Req": "AfV",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2c7d6d3ad7038542fb0e",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "SFB 8",
          "Descri": "QAREGARG",
          "Maxappli": 10,
          "Maxposi": 1,
          "Deadline": "08/08/2021 23:55",
          "Job_Type": 1,
          "Job_Dura": 7,
          "Job_Sal": 120000,
          "Skill_Req": "AEG",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2ca06d3ad7038542fb0f",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "RF 9 ",
          "Descri": "AERG",
          "Maxappli": 10,
          "Maxposi": 1,
          "Deadline": "05/02/2021 23:55",
          "Job_Type": 3,
          "Job_Dura": 3,
          "Job_Sal": 98,
          "Skill_Req": "AR",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2cc76d3ad7038542fb10",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "EARG 10",
          "Descri": "ARGWG",
          "Maxappli": 100,
          "Maxposi": 18,
          "Deadline": "10/02/2021 23:55",
          "Job_Type": 2,
          "Job_Dura": 5,
          "Job_Sal": 789654,
          "Skill_Req": "ARR",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        },
        {
          "Status": "pending",
          "_id": "600d2cf26d3ad7038542fb11",
          "UserId": "600d2070dab73f7079bb5f21",
          "Company_name": "ar@gmail.com",
          "email": "Archit",
          "Title": "RWG 11",
          "Descri": "QET",
          "Maxappli": 120,
          "Maxposi": 78,
          "Deadline": "06/02/2021 23:55",
          "Job_Type": 1,
          "Job_Dura": 7,
          "Job_Sal": 194523,
          "Skill_Req": "RW",
          "Rating": 0,
          "sumRating": 0,
          "Ondate": "24/1/2021",
          "__v": 0
        }
      ]
    this.setState({dataalljob:zzapdata}) 
}

async componentDidMount(){
    this.getalljobinfo()
}
  
//  onChange(event) {
//     let name = event.target.name
//     let value = event.target.value
//     this.setState({[name]: value}, () => {
//         console.log(this.state)
//     })
// } 
// onSubmit(e) {
//     e.preventDefault();

//     const newJob = {
//         UserId:this.state.jodar_id,
//         Company_name:this.state.comname,
//         email:this.state.email,
//         Title:this.state.title,
//         Descri:this.state.des,
//         Maxappli:this.state.maxapp,
//         Maxposi:this.state.maxpos,
//         Deadline:this.state.deadline,
//         Job_Type:this.state.jtype,
//         Job_Dura:this.state.jdur,
//         Job_Sal:this.state.sala,
//         Skill_Req:this.state.skilltok,
//         Rating:0,
//         sumRating:0,
//         Ondate:this.state.ondate,
//     }

//     console.log(newJob)
//     axios.post('/addjob', newJob)
//         .then(res => {
//             console.log("ok")
//             console.log(res.data)
//             if(res.data.status === '201')
//             {
//                 ///////
//                 alert("ok add")
//             }
//             else
//             {
//                 alert("Error")
//                 // window.location.reload()
//             }
//         })
//         .catch(err=>{
//             console.log(err)
//         })

//     this.setState({
//         comname:"",
//         email:"",
//         ondate:"",
//         jodar_id:"",
//         title:"",
//         des:"",
//         maxapp:"",
//         maxpos:"",
//         deadline:"",
//         jtype:"",
//         jdur:"",
//         sala:"",
//         skilltok:""
//     });
// }

// myapp =(
//     <div >

//       <TableContainer component={Paper}>
//       <Table  aria-label="customize table">
//         <TableHead style={{ backgroundColor: "rgb(78,94,186)", color: "rgb(250,250,250)",}}>
//           <TableRow>
//             <TableCell color="white"><b>Title</b></TableCell>
//             <TableCell align="center"><b>Max Applicants</b></TableCell>
//             <TableCell align="center"><b>Max Postions</b></TableCell>
//             <TableCell align="center"><b>Posted on</b></TableCell>
//             <TableCell align="right"><b>Options</b></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//             <TableRow>
//             <TableCell>Title</TableCell>
//                 <TableCell align="center">Max Applicants</TableCell>
//                 <TableCell align="center">Max Postions</TableCell>
//                 <TableCell align="center">Posted on</TableCell>
//                 <TableCell align="right"><Button variant="contained" color="default">View</Button></TableCell>
//             </TableRow>
//             {/* {props.datax.map((row) => (
//               <TableRow>
//                   <TableCell >{row.Edu}</TableCell>
//                   <TableCell align="right">{row.Edus}</TableCell>
//                   <TableCell align="right">{row.Edue}</TableCell>
//               </TableRow>
//             ))} */}
//             {
//               !1 &&
//               <TableRow>
//                   <TableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
//                   <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
//                   <TableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></TableCell>
//               </TableRow>
              
//             }
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </div>
//   )

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
        <DataTable dataalljob={this.state.dataalljob}></DataTable>
    </Container>
  )};
}
