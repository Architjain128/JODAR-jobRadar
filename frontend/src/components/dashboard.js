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
import ListAltIcon from '@material-ui/icons/ListAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import Mydashappli from "./applicantmyappli";
import Appprofile from "./appprofile";
import Apphome from "./apphome";

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

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [homey, setHomey] = React.useState(false);
  const [dashy, setDashy] = React.useState(true);
  const [appyy, setAppyy] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const homeyzz = () =>{
    setHomey(true);
    setDashy(false);
    setAppyy(false);
  }
  const dashyzz = () =>{
    setHomey(false);
    setDashy(true);
    setAppyy(false);
  }
  const appyyzz = () =>{
    setHomey(false);
    setDashy(false);
    setAppyy(true);
  }

  const logoutme = () => {
    localStorage.removeItem("Jodar_id");
    localStorage.removeItem("Jodar_id_type");
    localStorage.removeItem("Jodar_googleapi_name");
    localStorage.removeItem("Jodar_googleapi_firstname");
    localStorage.removeItem("Jodar_googleapi_lastname");
    localStorage.removeItem("Jodar_googleapi_email");
    localStorage.removeItem("Jodar_googleapi_password");
    alert("Bye Applicant")
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
            Dashboard for Applicant
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
            <ListItem button key={"Profile"} onClick={dashyzz}>
              <ListItemIcon> <PersonIcon /></ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
            <ListItem button key={"Jobs"} onClick={homeyzz}>
              <ListItemIcon> <ViewQuiltIcon /></ListItemIcon>
              <ListItemText primary={"Jobs"} />
            </ListItem>
            <ListItem button key={"My Applications"} onClick={appyyzz}>
              <ListItemIcon> <ListAltIcon /></ListItemIcon>
              <ListItemText primary={"My Applications"} />
            </ListItem>
        </List>
        <Divider />
        <List >
            <ListItem button key={"Logout"} onClick={logoutme}>
              <ListItemIcon > <ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          {dashy === true ? <Appprofile data1={props.data1} data2={props.data2} data3={props.data3} data4={props.data4} ></Appprofile> : null}
          {homey === true ? <Apphome data1={props.data1} datajj={props.datajj}></Apphome> : null}
          {appyy === true ? <Mydashappli data1={props.data1} datajj={props.datajj}></Mydashappli> : null}
      </main>
     
    </div>
  );
}
