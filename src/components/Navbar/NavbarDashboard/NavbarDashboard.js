import React from "react";
import PublicNavbarDashboard from "../PublicNavbar/PublicNavbarDashboard";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    navbar: {
      [theme.breakpoints.down("md")]: {
        padding: "10px"
      },
      [theme.breakpoints.up("lg")]: {
        padding: "10px"
      }
    }
  };
});

const NavbarDashboard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <PublicNavbarDashboard />
        </Toolbar>
      </AppBar>
      <div style={{ marginBottom: "70px" }}></div>
    </React.Fragment>
  );
};

export default NavbarDashboard;
