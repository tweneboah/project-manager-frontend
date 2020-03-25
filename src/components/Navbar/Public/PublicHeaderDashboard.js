import React from "react";
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  useMediaQuery
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";

//custom imports
// import logo from "../../assets/logo.svg";
import NavbarTabs from "./PublicNavbarTabs";
import PublicNavbarSideDrawer from "../../Navbar/Public/PublicNavbarSideDrawer";
import PublicNavbarTabs from "../Public/PublicNavbarTabs";

//INLINE STYLES
const useStyles = makeStyles((theme) => ({
  toobarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem"
    }
  },
  logo: {
    height: "7rem",
    [theme.breakpoints.down("md")]: {
      height: "6rem"
    },
    [theme.breakpoints.down("xs")]: {
      height: "4rem"
    }
  },
  tabContainer: {
    marginLeft: "auto"
  },

  logoContainer: {
    padding: 0,
    "&:hover": {
      background: "transparent"
    }
  }
}));

//To add more effect to the Navbar when user is scrolling
const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0 //This determine how far the user scroll before seeing this effect
  });

  //This returns new copy of the component it is wrapped with
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0 //
  });
};

const PublicHeaderDashboard = () => {
  //Extract classes
  const classes = useStyles();
  //Create an instance of our theme for responsive design
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}>
              {/* <img className={classes.logo} src={logo} alt="logo" /> */}
              Projector
            </Button>
            {matches ? <PublicNavbarSideDrawer /> : <PublicNavbarTabs />}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toobarMargin} />
    </React.Fragment>
  );
};

export default PublicHeaderDashboard;

// Toolbar is arranging items horizontally

// postition fixed is by default
//disAbleGutters remove extra padding from a div

// TAB

//It receives a value which represent the index of the selected tab
//value={0} means the first tabs will be selected

// MENU
//Example is poping up when something is click
// anchorEl: The DOM element used to set the position of the menu.

// STEPS:
//Create two state and two functions

// Apply the event listener on the tab menu you want to click

// Define your menu and pass in the relevant props and methods so that we those functions runs the menu will pop up

// DEFINE THIS ON THE MENU YOU WANT TO DISPLAY THE SUB MENU WHEN CLICK
// PUT THIS ALSO IN THE TOOLBAR

/*
<Toolbar>
<Tab
    arial-owns={anchorEl ? "simple-menu" : undefined}
    aria-haspopup={anchorEl ? "true" : undefined}
    onClick={(event) => handleClick(event)}
    className={classes.tab}
    component={Link}
    to="/services"
    label="Services"
  />

   <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/customsoftware">
          Custom Software development
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/mobile">
          Mobile App development
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/website">
          Website development{" "}
        </MenuItem>
      </Menu>

      // HOW TO SET MULTIPLE FUNTIONS TO onClick event because in our case we want to set the active tab on the services tab so we have to pass those function on all the tabs

</Toolbar>

THE PROPS:
    arial-owns={anchorEl ? "simple-menu" : undefined}
    aria-haspopup={anchorEl ? "true" : undefined}
    onClick={(event) => handleClick(event)} You can also use onMouseHover
*/

// Remember put them in the Toolbar

/*
<Toolbar>
  <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}  MenuListProps={{ onMouseLeave: handleClose }}>
    <MenuItem onClick={handleClose}>Custom Software development </MenuItem>
    <MenuItem onClick={handleClose}>Mobile App development</MenuItem>
    <MenuItem onClick={handleClose}>Website development </MenuItem>
  </Menu>
</Toolbar>;
*/

// PROPS

// id="simple-menu"
//anchorEl={anchorEl}
//open={open}
//onClose={handleClose}
// MenuListProps={{ onMouseLeave: handleClose }} This is how we pass the onMoseLeave to the menu when a user hover out the menu

// STYLING MENUS

// Since the Menu was build on top of other component which is paper because it was the paper component which handles the menu. To be able to know that go to the API of the Menu and under css rule name you will see this paper	.MuiMenu-paper	Styles applied to the Paper component. you will see this also With a rule name under css

// Since we want to customise a component from a different component like in our case, we want to customise the paper component from our menu so instead of using className we will use classes and then we target the css rule name which is paper like so classes ={{paper: 'Your color here'}}

//RESPONSIVE DESIGN

// useMediaQuery: this helps us to get the createBreakpoints

// useTheme : this helps to get access to an instance of our theme so that we can change the breakpoints

//STEPS

//1. Create an instance of our theme
//  const theme = useTheme()
