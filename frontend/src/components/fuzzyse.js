// import data from "./data.json";
import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import  {columnLookupSelector, DataGrid}  from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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
import nopro from "../files/images/noprofile.jpg"
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';

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


export default function SettingsPage(props) {
  const classes = useStyles();
  const [titira, settitira] = useState("1");
  const [titi, settiti] = useState("1");
  const [titidu, settitidu] = useState("1");
  const [titidura, settitidura] = useState("9");
  const [titity, settitity] = useState("All");
  const [value, setValue] = React.useState([0, 200000]);
  const [searchData, setSearchData] = useState(props.data);
  const [datasci, setDatasci] = useState(false);
  
  const searchItem = (query) => {
    settiti("1")
    settitira("1")
    settitidu('1')
    setValue([0,200000]);
    settitity('All')
    settitidura('9')
    setSearchData(props.data);
    
    console.log(props.data)
    if (!query || query==="" || query===" ") {
      setSearchData(props.data);
      return;
    }

    const fuse = new Fuse(props.data, {
      keys: ["Title"]
    });

    const result = fuse.search(query);
    const finalResult = [];

    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    }
    else {
      setSearchData([]);
    }
  };
  
  const handlesortsal=(e)=>{
    settiti(e.target.value)
    settitira("1")
    settitidu('1')
    setValue([0,200000]);
    settitity('All')
    settitidura('9')
    setSearchData(props.data);

    if(e.target.value===2)
    searchData.sort((a,b) => (a.Salary - b.Salary))
    if(e.target.value===3)
    searchData.sort((a,b) => (b.Salary - a.Salary))
  }
  const handlesortra=(e)=>{
    settitira(e.target.value)
    settiti("1")
    settitidu('1')
    setValue([0,200000]);
    settitity('All')
    settitidura('9')
    setSearchData(props.data);

    if(e.target.value===2)
    searchData.sort(function(a,b) {
      let g=a.Rating
      let h=b.Rating
      if(a.Rating==="NaN" || a.Rating === 0 || isNaN(a.Rating)===true)g=6
      if(b.Rating==="NaN" || b.Rating === 0 || isNaN(b.Rating)===true)h=6
      return g - h
    })
    if(e.target.value===3)
    searchData.sort(function(a,b) {
      let g=a.Rating
      let h=b.Rating
      if(a.Rating==="NaN" || a.Rating === 0 || isNaN(a.Rating)===true)g=-1
      if(b.Rating==="NaN" || b.Rating === 0 || isNaN(b.Rating)===true)h=-1
      return h-g
    })
  }
   const handlesortdu=(e)=>{
    settitidu(e.target.value)
    settiti("1")
    settitira("1")
    setValue([0,200000]);
    settitity('All')
    settitidura('9')
    setSearchData(props.data);

    if(e.target.value===2)
    searchData.sort(function(a,b) {
      let g=a.Duration
      let h=b.Duration
      if(g==="Indefinite")g=7
      if(h==="Indefinite")h=7
      return g - h
    })
    if(e.target.value===3)
    searchData.sort(function(a,b) {
      let g=a.Duration
      let h=b.Duration
      if(g==="Indefinite")g=7
      if(h==="Indefinite")h=7
      return  h-g
    })
  }

  const handlefilty=(e)=>{
    settitity(e.target.value)
    settitidura('9')
    setValue([0,200000]);
    settiti("1")
    settitidu('1')
    settitira("1")
    setSearchData(props.data);

    console.log(e.target.value)
    if(e.target.value==="All")
    {
      const aaa = props.data
      setSearchData( aaa.filter(function(a){ return 1}))
    }
    if(e.target.value==="Full Time")
    {
      const aaa = props.data
      setSearchData( aaa.filter(function(a){ return a.Type === "Full Time" }))
    }
    else if(e.target.value == "Part Time")
    {
      const aaa = props.data
      setSearchData( aaa.filter(function(a){return a.Type === "Part Time"}))
    }
    else if(e.target.value == "Work From Home")
    {
      const aaa = props.data
      setSearchData( aaa.filter(function(a){return a.Type === "Work From Home"}))
    }
    else
    setSearchData( props.data)
  }
  const handlefildura=(e)=>{
    settitidura(e.target.value)
    settitity('All')
    setValue([0,200000]);
    settiti("1")
    settitidu('1')
    settitira("1")
    setSearchData(props.data);

    if(e.target.value === '1')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){ return a.Duration < 1 }))
    }
    else if(e.target.value === '2' )
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 2}))
    }
    else if(e.target.value === '3')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 3}))
    }
    else if(e.target.value === '4')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 4}))
    }
    else if(e.target.value === '5')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 5}))
    }
    else if(e.target.value === '6')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 6}))
    }
    else if(e.target.value === '7')
    {
      const aaa = props.data
      setSearchData(aaa.filter(function(a){return a.Duration < 7}))
    }
    else
    setSearchData(props.data)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    settitity('All')
    settitidura('9')
    settiti("1")
    settitidu('1')
    settitira("1")
    const aaa = props.data
    setSearchData( aaa.filter(function(a){return a.Salary >= value[0] && a.Salary<=value[1]}))
  };

  const onClickapply = (e) => {

    console.log(props.datawwacc)
    let aa1 = props.datawwacc[0]
    let aa2 = props.datawwacc[1]
    // console.log(props.datawwacc[1])
    if(aa2>0)
    {
      alert("Can't apply, you already had a job so go and watch netflix")
    }
    else if(aa1>9)
    {
      alert("Can't apply, you already applied for 10 jobs go and build more skills to got selected")
    }
    else
    {
      let rowid2 = e.currentTarget.value
      console.log(rowid2)
      localStorage.setItem('Jodar_jobapp',rowid2)
      window.location.href="/applyjob"
    }
  };
  const onClickapplied = (e) => {
    let rowid2 = e.currentTarget.value
    console.log(rowid2)
    localStorage.setItem('Jodar_jobapp',rowid2)
    window.location.href="/seejob"
  };

  return (
    <div>
      <br/>
      <hr></hr>
        <Typography variant="h6"><b> Fuzzy Search</b></Typography><br/>
        <div className="search-container">
          <input
            type="search"
            onChange={(e) => searchItem(e.target.value)}
            placeholder="Search by Title"
          />
        </div>
      <br/>
      <hr></hr>
      
        <Typography variant="h6"><b> Filtering</b></Typography>
        <br/>
          <Typography id="range-slider" gutterBottom>
            Salary Range
          </Typography>
          <Box><b>Lower limit</b> {value[0]}</Box>
          <Box><b>Upper limit</b> {value[1]}</Box>
          <Slider
            value={value}
            min={0}
            step={10}
            max={200000}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        <br/>
          <InputLabel id="demo-simple-select-label">Filter by Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={titity}
              onChange={handlefilty}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Work From Home">Work From Home</MenuItem>
            </Select>
        <br/>
        <br/>
          <InputLabel id="demo-simple-select-label">Filter by Duration</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={titidura}
              onChange={handlefildura}
            >
              <MenuItem value="9">All</MenuItem>
              <MenuItem value="1">less than 1 month</MenuItem>
              <MenuItem value="2">less than 2 months</MenuItem>
              <MenuItem value="3">less than 3 months</MenuItem>
              <MenuItem value="4">less than 4 months</MenuItem>
              <MenuItem value="5">less than 5 months</MenuItem>
              <MenuItem value="6">less than 6 months</MenuItem>
              <MenuItem value="7">less than 7 months</MenuItem>
              <MenuItem value="8">less than 8 months</MenuItem>
            </Select>
      <br/>
      <br/>
      <hr></hr>
      
        <Typography variant="h6"><b> Sorting</b></Typography>
        <br/>
        <br/>
        <InputLabel id="demo-simple-select-label">Sorting by Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={titira}
            onChange={handlesortra}
          >
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>Asc</MenuItem>
            <MenuItem value={3}>Des</MenuItem>
          </Select>
        <br/>
        <br/>
        <InputLabel id="demo-simple-select-label">Sorting by Salary</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={titi}
            onChange={handlesortsal}
          >
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>Asc</MenuItem>
            <MenuItem value={3}>Des</MenuItem>
          </Select>
        <br/>
        <br/>
        <InputLabel id="demo-simple-select-label">Sorting by Duration</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={titidu}
            onChange={handlesortdu}
          >
            <MenuItem value={1}>None</MenuItem>
            <MenuItem value={2}>Asc</MenuItem>
            <MenuItem value={3}>Des</MenuItem>
          </Select>
        <br/>
        <br/>
        <hr></hr>
        <br/>
        <br/>

    <div style={{ height: 650, width: '100%' }}> 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customize table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Recruiter</StyledTableCell>
            <StyledTableCell>Rating</StyledTableCell>
            <StyledTableCell>Salary</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Duration**</StyledTableCell>
            <StyledTableCell align="right">Deadline</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
            {searchData.map((row) => (
              <StyledTableRow>
                  <StyledTableCell >{row.Title}</StyledTableCell>
                  <StyledTableCell align="right">{row.RecName}</StyledTableCell>
                  <StyledTableCell align="right">
                    {
                     (row.Rating === null ||  row.Rating === '' || isNaN(row.Rating) ) ? <>Not rated yet</>: <Rating defaultValue={row.Rating} readOnly precision={0.5}></Rating>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.Salary}</StyledTableCell>
                  <StyledTableCell align="right">{row.Type}</StyledTableCell>
                  <StyledTableCell align="right">{row.Duration}</StyledTableCell>
                  <StyledTableCell align="right">{row.Deadline}</StyledTableCell>
                  <StyledTableCell align="right">
                      {
                      row.Status === "Apply" 
                      ?
                      <Button  value={row.id} variant="contained" color="primary" onClick={onClickapply} >Apply</Button>
                      :
                      row.Status === "Applied" 
                      ? 
                      <Button value={row.id} variant="contained" color="secondary" onClick={onClickapplied} >Applied</Button> 
                      : 
                      row.Status === "Position Full" 
                      ? 
                      <Typography value={row.id} color="error" style={{fontSize:12}} >Position Filled</Typography> 
                      :
                      <Typography value={row.id} color="error" style={{fontSize:12}}>Application limit reached</Typography> 
                      }
                    </StyledTableCell>
              </StyledTableRow>
            ))}
            {
              !searchData.length && 

              <StyledTableRow>
                  <StyledTableCell ><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell align="right"><Chip variant="outlined" color="secondary" size="small" label="None" /></StyledTableCell>
                  <StyledTableCell ></StyledTableCell>
              </StyledTableRow>

            }

        </TableBody>
      </Table>
    </TableContainer>
<Typography variant="subtitle"> *If table showing none values try to enter " " space as input in search box to see results if present</Typography><br/>
<Typography variant="subtitle"> ** Durations are in months</Typography>
      {/* <DataGrid rows={datasci?searchData:props.data}  columns={columns} showToolbar autoPageSize onCellClick /> */}
      </div>
    </div>
  );
};
