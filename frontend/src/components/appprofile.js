import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';


function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(78,94,186)",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  root1: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  media: {
    height:0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 600,
  },
}));




export default function Appprofile(props) {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [jodar_id, setJodarID] = React.useState(localStorage.getItem("Jodar_id"));
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [dp, setdp] = React.useState(null);
  const [values, setValues] = React.useState({
    specy : "",
    edu : "",
    edus : "",
    edue : "present",
    fna : "",
    lna : "",
    ena : "",
    enaerr : false,
    enaerrmsg : null,
    // prorating: 3,
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onskillSubmit =()=>{
    const newskill = {
      UserId : jodar_id,
      Spec : values.specy,
    }
    console.log(newskill)
        axios.post('/addskill', newskill)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                alert(res.data.msg)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
                alert("error")
            })
    setOpen(false);
  }
  const oneduSubmit =()=>{
    const newedu = {
      UserId : jodar_id,
      Edu : values.edu,
      Edus : values.edus,
      Edue : values.edue,
    }
    console.log(newedu)
        axios.post('/addedu', newedu)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                alert(res.data.msg)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
                alert("error")
            })
    setOpen2(false);
  }

  const onupdatepro= ()=>{
    if(values.enaerr === true)
    {
        alert("Please enter valid data")
        return
    }
    const newedu = {
      UserId : jodar_id,
      Firstname : values.fna,
      Lastname : values.lna,
      email : values.ena,
    }
    console.log(newedu)
        axios.put('/uppro', newedu)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                alert(res.data.msg)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
                alert("error")
            })
    setOpen3(false);
  }
  const validateEmail=(e)=>{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if( e.target.value.trim() === "")
    {
      setValues({ ...values, enaerr: false , enaerrmsg : null });
    }
    else if (reg.test(e.target.value) == false) 
    {
      setValues({ ...values, enaerr: true , enaerrmsg : "Please enter valid email" });
    }
    else
    {
      setValues({ ...values, enaerr: false , enaerrmsg : null });
    }
  }

  const skill =(
    <div className={classes.root1}>
      {props.data3.map(name => (
      <Chip variant="outlined" color="default" size="small" label={name} />
      ))}
      {
      !props.data3.length &&
      <Chip variant="outlined" color="secondary" size="small" label="None" />
      }

    </div>
  )
  const educationy =(
    <div className={classes.root1}>

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customize table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Institution Name</StyledTableCell>
            <StyledTableCell align="right">Start Date(YYYY)</StyledTableCell>
            <StyledTableCell align="right">End Date(YYYY)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.data4.map((row) => (
              <StyledTableRow>
                  <StyledTableCell >{row.Edu}</StyledTableCell>
                  <StyledTableCell align="right">{row.Edus}</StyledTableCell>
                  <StyledTableCell align="right">{row.Edue}</StyledTableCell>
              </StyledTableRow>
            ))}
            {
              !props.data4.length &&
              <StyledTableRow>
                  <StyledTableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
              </StyledTableRow>
              
            }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
  const addskill = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add a skill</h2>
      <TextField
        variant="standard"
        margin="normal"
        required
        name="new_skill"
        label="Enter new Skill"
        type="text"
        id="new_skill"
        onChange = {handleChange('specy')}
        />
      <Button
      type="submit"
      variant="contained"
      color="primary"
      id="addskill"
      onClick = {onskillSubmit}
      >Add skill</Button>
    </div>
  )

  const addedu = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add a Eduction Instance</h2>
      <TextField
        variant="standard"
        margin="normal"
        required
        name="new_edu"
        label="Enter Institution Name"
        type="text"
        id="new_edu"
        onChange = {handleChange('edu')}
        />
        <TextField
        variant="standard"
        margin="normal"
        required
        name="new_edus"
        label="Start Year (YYYY)"
        type="text"
        id="new_edus"
        onChange = {handleChange('edus')}
        />
        <TextField
        variant="standard"
        margin="normal"
        name="new_edue"
        label="End Year (YYYY/present)"
        type="text"
        id="new_edue"
        onChange = {handleChange('edue')}
        />
        <br/>
        <br/>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      id="addedu"
      onClick = {oneduSubmit}
      >Add instance</Button>
    </div>
  )

    const updatepro = (
      <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Update Profile</h2>
      <TextField
        variant="standard"
        margin="normal"
        name="new_edu"
        label="First Name"
        type="text"
        id="new_edu"
        onChange = {handleChange('fna')}
        />
        <TextField
        variant="standard"
        margin="normal"
        name="new_edus"
        label="Last Name"
        type="text"
        id="new_edus"
        onChange = {handleChange('lna')}
        />
        <TextField
        variant="standard"
        margin="normal"
        name="new_edue"
        label="Email"
        error = {values.enaerr}
        helperText = {values.enaerrmsg}
        onBlur = {validateEmail}
        type="text"
        id="new_edue"
        onChange = {handleChange('ena')}
        />
        <br/>
        <br/>
      <Button
      type="submit"
      variant="contained"
      color="primary"
      id="addedu"
      onClick = {onupdatepro}
      >Update</Button>
    </div>
    )


  const imgadd=(e)=>{
    setdp(e.target.files[0])
    console.log(e.target.files[0])
    const formData = new FormData();        
    formData.append('dp', e.target.files[0]);
    axios.post('/addimg/'+jodar_id, formData)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                alert(res.data.msg)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
                alert("error")
            })
  }
  const pdfadd=(e)=>{
    setdp(e.target.files[0])
    console.log(e.target.files[0])
    const formData = new FormData();        
    formData.append('dp', e.target.files[0]);
    axios.post('/addpdf/'+jodar_id, formData)
            .then(res => {
                console.log("ok")
                console.log(res.data)
                alert(res.data.msg)
                window.location.reload()
            })
            .catch(err=>{
                console.log(err)
                alert("error")
            })
  }
  console.log(props)
  return (
      <Container>
    <div className={classes.root}>
        <div>
      <Card>
        <img src={props.data2[1]} style={{width:400,height:400}}/>
        {/* </CardMedia> */}
        <CardActions>
        <label disabled>
          Change Profile Image
        </label>
        <input onChange={imgadd} className={classes.input} id="icon-button-file" type="file" />
        </CardActions>
      </Card>
      </div>
      <Box color='#fafafa'>
        <Typography variant="caption">Account made on</Typography>
        <Typography variant="h5">{props.data1[3]}</Typography>
      </Box>
      <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px',width:500}}>
        <Typography variant="caption">Rating</Typography>
        {
          (props.data2[0] === "NaN" || props.data2[0] === NaN || props.data2[0] === 0) ? <Typography> Not Rated Yet </Typography> : <Rating name="half-rating-read" precision={0.5} name="read-only" value={props.data2[0]} readOnly />
        }
      </Box>
      <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px',width:500}}>
        <Typography variant="caption">Email</Typography>
        <Typography variant="h5">{props.data1[2]}</Typography>
      </Box>
      <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px',width:500}}>
        <Typography variant="caption">First Name</Typography>
        <Typography variant="h5">{props.data1[0]}</Typography>
      </Box>
      <Box color="black" css={{ bgcolor: '#e2e2e2', p: 1,textAlign:'left',border:'black',borderRadius:'5px',margin:'20px',width:500}}>
        <Typography variant="caption">Last Name</Typography>
        <Typography variant="h5">{props.data1[1]}</Typography>
      </Box> 
                <div>

                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <Box
                    boxShadow="1"
                    borderRadius={12}
                    textAlign="center"
                    p='10px'
                    >
                    <Typography variant="h4">Education</Typography>
                    <Divider></Divider><br/>
                      {educationy}
                      <br/>
                      <Chip clickable="true"  onClick={handleOpen2} color="primary" avatar={<Avatar>+</Avatar>} label="Add" size="small"/>
                      <Modal
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                      >
                      {addedu}
                      </Modal>
                    </Box>
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <Box
                    boxShadow="1"
                    borderRadius={12}
                    textAlign="center"
                    p='10px'
                    >
                    <Typography variant="h4">Skills</Typography>
                    <Divider></Divider><br/>
                    {skill}
                    <br/>
                    <Chip clickable="true"  onClick={handleOpen} color="primary" avatar={<Avatar>+</Avatar>} label="Add" size="small"/>
                    <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    {addskill}
                    </Modal>
                    </Box>
                </FormControl>
                <br/>
                <br/>
                <iframe src={props.data2[2]} width="400" height="400"></iframe>
                <Typography >Upload Resume</Typography>
                <Typography ><input onChange={pdfadd} className={classes.input} id="icon-button-file" type="file" /></Typography>
                <br/><br/><br/><Divider/><br/>
                <br/>
                <Button onClick={handleOpen3} variant="contained" color="secondary" component="span">Edit Profile</Button>
                <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {updatepro}
                </Modal>
      </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </Container>
  );
}
