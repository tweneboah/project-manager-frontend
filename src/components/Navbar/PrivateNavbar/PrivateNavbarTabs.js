import React, { useState } from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/users/usersActions";
import { connect } from "react-redux";
import { API_URL } from "../../../config/URLs";

const useStyles = makeStyles((theme) => {
  return {
    login: {},
    linkItems: {},
    root: {
      [theme.breakpoints.down("sm")]: {
        color: "#e67e22"
      }
    },
    profilePicture: {
      width: "40px",
      height: "40px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%"
    }
  };
});

const PrivateNavbarTabs = (props) => {
  const { logout, userAuth } = props;
  const classes = useStyles();
  const [tabsValue, setTabsValue] = useState(0);
  const username = userAuth && userAuth.username;

  const userUrl = userAuth && userAuth.image[0].url;
  console.log(userUrl);
  //TAB HandleChange
  const tabHandleChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs value={tabsValue} onChange={tabHandleChange}>
        <Tab className={classes.root} label="Home" component={Link} to="/" />
        <Tab
          className={classes.linkItems}
          label="Projects"
          component={Link}
          to="/projects"
        />
        <Tab label="Logout" onClick={logout} />
        <Tab label={`Logged in as ${username}`} />
        <Tab
          label={
            <img
              className={classes.profilePicture}
              src={`${API_URL}/${userUrl}`}
            />
          }
        />
      </Tabs>
    </React.Fragment>
  );
};
const actions = {
  logout
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userAuth.myProfile
  };
};

export default connect(mapStateToProps, actions)(PrivateNavbarTabs);
