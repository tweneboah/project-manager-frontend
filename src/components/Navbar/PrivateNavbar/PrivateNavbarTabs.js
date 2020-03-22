import React, { useState } from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/users/usersActions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    login: {},
    linkItems: {},
    root: {
      [theme.breakpoints.down("sm")]: {
        color: "#e67e22"
      }
    }
  };
});

const PrivateNavbarTabs = (props) => {
  const { logout, userAuth } = props;
  const classes = useStyles();
  const [tabsValue, setTabsValue] = useState(0);
  const username = userAuth && userAuth.username;

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
