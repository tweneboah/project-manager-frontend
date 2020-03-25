import React, { useState } from "react";
import { Tabs, Tab, makeStyles, Grid } from "@material-ui/core";
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
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center">
          {/* Children 1*/}
          <Grid item>
            {" "}
            <Tab
              className={classes.root}
              label="Home"
              component={Link}
              to="/"
            />
          </Grid>
          {/* Child 2 */}
          <Grid item style={{ flexGrow: 1 }}>
            <Tab
              className={classes.linkItems}
              label="Projects"
              component={Link}
              to="/projects"
            />
          </Grid>
          {/* Child 3 */}
          <Grid item style={{ flexGrow: 1 }}>
            <Tab label="About Me" component={Link} to="/about-me" />
          </Grid>
          {/* Child 4 */}

          <Grid item style={{ flexGrow: 1 }}>
            <Tab label="Logout" onClick={logout} />
          </Grid>
          {/* Child 5*/}
          <Grid item style={{ flexGrow: 1 }}>
            <Tab label={`Logged in as ${username}`} />
          </Grid>
          {/* Child 6 */}
          <Grid item style={{ flexGrow: 2 }}>
            <Tab
              label={
                <img
                  className={classes.profilePicture}
                  src={`${API_URL}/${userUrl}`}
                />
              }
            />
          </Grid>
        </Grid>
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
