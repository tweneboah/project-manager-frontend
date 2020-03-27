import React, { useState, useEffect } from "react";
import { Tab, Tabs, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link, withRouter } from "react-router-dom";

//INLINE STYLES
//---------------------------------
const useStyles = makeStyles((theme) => ({
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab, //using our customized definition
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    borderRadius: "50px",
    marginRight: "20px",
    marginLeft: "50px",
    ...theme.typography.estimate
  },
  menu: {
    backgroundColor: "#426861",
    color: "white"
  },
  menuItem: {
    opacity: 0.7,
    "&:hover": {
      background: "#fd79a8",
      opacity: 1
    }
  },
  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginLeft: "auto",
    marginRight: "20px",
    color: "inherit"
  }
}));

const PublicNavbarTabs = (props) => {
  //Extract classes
  const classes = useStyles();
  //Create an instance of our theme for responsive design
  // Menu hook
  const [anchorEl, setAnchorEl] = useState(null); //position of the menu
  const [openMenu, setOpenMenu] = useState(false); //Determine the visibility of the menu
  //hooks for the tab
  const [value, setValue] = useState(0);
  //Onchange handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // HandleClick for the menu
  //----------------------------------

  const handleClick = (event) => {
    console.log(event);
    // The event represent either click or hover and this determine where we click whether on a button or div and we can get it position event.currentTarget
    setAnchorEl(event.currentTarget); //The element was click
    setOpenMenu(true);
  };

  // HandleClose for the menu
  //----------------------------------
  const handleClose = (e) => {
    setAnchorEl(null); //Don't set any position
    setOpenMenu(false);
  };

  //Determine the selected tab when the page refreshes
  useEffect(() => {
    if ((window.location.pathname === "/") & (value !== 0)) {
      setValue(0);
    } else if ((window.location.pathname === "/services") & (value !== 1)) {
      setValue(1);
    } else if ((window.location.pathname === "/revolution") & (value !== 2)) {
    } else if ((window.location.pathname === "/about") & (value !== 3)) {
      setValue(3);
    } else if ((window.location.pathname === "/contact") & (value !== 4)) {
      setValue(4);
    }
  }, [value]);

  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}>
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          arial-owns={anchorEl ? "simple-menu" : undefined} //arial-owns represent the menu it will render so it will check if there is menu by using the id
          aria-haspopup={anchorEl ? "true" : undefined} //Pop up the menu
          onMouseOver={(event) => handleClick(event)}
          className={classes.tab}
          component={Link}
          to="/services"
          label="Services"
          style={{ color: "white", background: "black", borderRadius: "20px" }}
        />
        <Tab
          component={Link}
          to="/login"
          className={classes.tab}
          label="Login"
        />
        <Tab
          component={Link}
          to="/register"
          className={classes.tab}
          label="Register"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/aboutme"
          label="About Me"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/contact"
          label="Contact us"
        />
      </Tabs>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => props.history.push("/what-this-app-can-do")}
        style={{ backgroundColor: "#F76A8C", color: "white" }}>
        Try For Free
      </Button>
      <Menu
        id="simple-menu" //This is use to represent the tab which triggers this menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}>
        <MenuItem
          onClick={() => {
            handleClose();
            setValue(1);
          }}
          classes={{ root: classes.menuItem }}
          component={Link}
          to="/services">
          Services
        </MenuItem>
        <MenuItem
          classes={{ root: classes.menuItem }}
          onClick={() => {
            handleClose();
            setValue(1);
          }}
          component={Link}
          to="/customsoftware">
          Custom Software development
        </MenuItem>
        <MenuItem
          classes={{ root: classes.menuItem }}
          onClick={() => {
            handleClose();
            setValue(1);
          }}
          component={Link}
          to="/study">
          Study Web Development with me
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default withRouter(PublicNavbarTabs);
