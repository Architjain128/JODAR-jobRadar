import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import FS from '@material-ui/icons/StarSharp';
import ES from '@material-ui/icons/StarOutlineSharp';
import axios from 'axios';

const options = [<><FS/><ES/><ES/><ES/><ES/></>,<><FS/><FS/><ES/><ES/><ES/></>,<><FS/><FS/><FS/><ES/><ES/></>,<><FS/><FS/><FS/><FS/><ES/></>,<><FS/><FS/><FS/><FS/><FS/></>];

export default function SplitButton2(props) {
  const [Ropen, setROpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const RhandleClick = () => {
      let rat = selectedIndex +1
    console.log("You clicked " + rat + " for "+ props.datar);
    let jd = props.dataj
    let ratty = ({rated : rat,juid: jd})
    axios.post('/rateuser/'+props.datar,ratty)
    .then(res => {
        console.log("ok")
        console.log(res.data)
        if(res.data.status === '201')
        {
            alert("Rated")
        }
        else
        {
            alert("Error in rating")
        }
        window.location.reload()
    })
    .catch(err=>{
        console.log(err)
    })
    
  };

  const RhandleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setROpen(false);
  };

  const RhandleToggle = () => {
    setROpen((prevOpen) => !prevOpen);
  };

  const RhandleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setROpen(false);
  };
  return (
      <>
        <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
          <Button onClick={RhandleClick}>{options[selectedIndex]}</Button>
          <Button color="primary" size="small" aria-controls={Ropen ? 'split-button-menu' : undefined} aria-expanded={Ropen ? 'true' : undefined} aria-label="select merge strategy" aria-haspopup="menu" onClick={RhandleToggle}>
          <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        
        <Popper open={Ropen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={RhandleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => RhandleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
  );
}
