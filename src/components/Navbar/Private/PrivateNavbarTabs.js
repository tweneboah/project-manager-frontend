import React, { useState, useEffect } from "react";
import { Tab, Tabs, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/users/usersActions";
import { connect } from "react-redux";
import { API_URL } from "../../../config/URLs";
import avatar from "../../../images/avatar.png";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import { withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
  },
  profilePicture: {
    width: "40px",
    height: "40px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "50%",
    border: "1px dashed yellow"
  }
}));

const PrivateNavbarTabs = (props) => {
  const { userAuthImage, userAuthUsername, logout, currentUser } = props;
  //Extract classes
  const classes = useStyles();

  const [tabsValue, setTabsValue] = useState(0);
  //Create an instance of our theme for responsive design
  // Menu hook
  const [anchorEl, setAnchorEl] = useState(null); //position of the menu
  const [openMenu, setOpenMenu] = useState(false); //Determine the visibility of the menu
  //hooks for the tab
  const [value, setValue] = useState(0);
  // const userUrl = currentUser && currentUser.image.url;

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

  //Onchange handler
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // HandleClick for the menu
  //----------------------------------

  const handleClick = (event) => {
    // The event represent either click or hover and this determine where we click whether on a button or div and we can get it position event.currentTarget
    setAnchorEl(event.currentTarget); //The element was click
    setOpenMenu(true);
  };

  //TAB HandleChange
  const tabHandleChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  // HandleClose for the menu
  //----------------------------------
  const handleClose = (e) => {
    setAnchorEl(null); //Don't set any position
    setOpenMenu(false);
  };

  if (!currentUser.picture) {
    return <LoadingComponent />;
  }

  const logoutUser = () => {
    logout();

    //props.history.push("/");
  };
  return (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}>
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          className={classes.tab}
          component={Link}
          to="/projects"
          label="Projects"
        />
        <Tab
          component={Link}
          to="/upload"
          className={classes.tab}
          component={Link}
          label="Upload"
        />
      </Tabs>
      <Tab
        label={`Logged in as ${currentUser.username}`}
        className={classes.tab}
      />
      <Tab
        label={
          <img
            className={classes.profilePicture}
            src={currentUser.picture.url}
          />
        }
      />
      <Button
        onClick={logoutUser}
        style={{ backgroundColor: "#591422" }}
        className={classes.button}
        variant="contained"
        color="secondary">
        Logout
      </Button>
      <ToastContainer autoClose={2000} />
    </React.Fragment>
  );
};

const actions = {
  logout
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userAuth.currentUser
  };
};

export default connect(mapStateToProps, actions)(withRouter(PrivateNavbarTabs));
