import React, { useEffect } from "react";
import PublicNavbarDashboard from "../PublicNavbar/PublicNavbarDashboard";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { setCurrentUser } from "../../../redux/actions/users/usersActions";
import { connect } from "react-redux";
import PrivateNavbarDashboard from "../PrivateNavbar/PrivateNavbarDashboard";

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

const NavbarDashboard = (props) => {
  const { currentUser, setCurrentUser } = props;
  
  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.navbar}>
        <Toolbar>
          {currentUser === null ? (
            <PublicNavbarDashboard />
          ) : (
            <PrivateNavbarDashboard />
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginBottom: "70px" }}></div>
    </React.Fragment>
  );
};

const actions = {
  setCurrentUser
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.userAuth.currentUser
  };
};
export default connect(mapStateToProps, actions)(NavbarDashboard);
