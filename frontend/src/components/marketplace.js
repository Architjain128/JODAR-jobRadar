import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Recprofile from "./recprofile";
import Addjob from "./addjob";
import Applicationlist from "./application";
import Acceptedlist from "./recdashviewacc" ;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Marketplace(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [mark, setMark] = React.useState(true);
  const [joby, setJoby] = React.useState(false);
  const [list, setList] = React.useState(false);
  const [dashy, setDashy] = React.useState(false);
  // const dasharr = {mark:false, joby:false, list:false};
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const markzz = () =>{
    setMark(true);
    setJoby(false);
    setList(false);
    setDashy(false);
  }
  const acczzz = () =>{
    setMark(false);
    setJoby(false);
    setList(false);
    setDashy(true);
  }
  const jobyzz = () =>{
    setMark(false);
    setJoby(true);
    setList(false);
    setDashy(false);
  }
  const listzz = () =>{
    setMark(false);
    setJoby(false);
    setList(true);
    setDashy(false);
  }

  const logoutme = () => {
    localStorage.removeItem("Jodar_id");
    localStorage.removeItem("Jodar_id_type");
    localStorage.removeItem("Jodar_googleapi_name");
    localStorage.removeItem("Jodar_googleapi_firstname");
    localStorage.removeItem("Jodar_googleapi_lastname");
    localStorage.removeItem("Jodar_googleapi_email");
    localStorage.removeItem("Jodar_googleapi_password");
    alert("Bye Recruter")
    window.location.href='/'
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard for Recruiter
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} >
            <HighlightOffOutlinedIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
            <ListItem button key={"Profile"} onClick={markzz}>
              <ListItemIcon> <PersonIcon /></ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button key={"Create Listings"} onClick={jobyzz}>
              <ListItemIcon> <PlaylistAddOutlinedIcon /></ListItemIcon>
              <ListItemText primary={"Create Listings"} />
            </ListItem>
            <ListItem button key={"View Listings"} onClick={listzz}>
              <ListItemIcon> <DescriptionOutlinedIcon /></ListItemIcon>
              <ListItemText primary={"View Listings"} />
            </ListItem>
             <ListItem button key={"View Accepted"} onClick={acczzz}>
              <ListItemIcon> <PlaylistAddCheckIcon /></ListItemIcon>
              <ListItemText primary={"View Accepted"} />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button key={"Logout"} onClick={logoutme}>
              <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
        </List>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {mark === true ? <Recprofile data1={props.data1} dataimg={props.dataimg} data2={props.data2}></Recprofile> : null}
        {joby === true ? <Addjob data1={props.data1} /> : null}
        {list === true ? <Applicationlist data1={props.data1} /> : null}
        {dashy === true ? <Acceptedlist data1={props.data1}/> : null}
      </main>
    </div>
  );
}
