import React, { useState } from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

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

const PublicNavbarTabs = () => {
  const classes = useStyles();
  const [tabsValue, setTabsValue] = useState(0);

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
          label="Register"
          component={Link}
          to="/register"
        />

        <Tab
          className={classes.linkItems}
          label="Dashboard"
          component={Link}
          to="/dashboard"
        />
        <Tab label="Login" component={Link} to="/login" />

        <Tab label="Projects" component={Link} to="/projects" />
      </Tabs>
    </React.Fragment>
  );
};

export default PublicNavbarTabs;
