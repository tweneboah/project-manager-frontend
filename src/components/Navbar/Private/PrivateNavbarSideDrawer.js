import React, { useState } from "react";
import {
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, currentUser } from "../../../redux/actions/users/usersActions";
import { API_URL } from "../../../config/URLs";
import avatar from "../../../images/avatar.png";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
//INLINE STYLES
const useStyles = makeStyles((theme) => ({
  drawerIconContainer: {
    "&:hover": {
      backgroundColor: "#0984e3"
    },
    marginLeft: "auto",
    marginRight: "20px",
    color: "inherit"
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawer: {
    backgroundColor: "#426861"
  },
  drawerItem: {
    color: "white"
  },
  drawerButton: {
    background: "#d63031",
    padding: "10px"
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

const PrivateNavbarSideDrawer = (props) => {
  const { userAuthUsername, userAuthImage } = props;
  //Extract classes
  const classes = useStyles();
  //DRAWER
  //check if we are on ios
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { logout, currentUser } = props;
  const [tabsValue, setTabsValue] = useState(0);
  if (currentUser.picture === undefined) {
    return <LoadingComponent />;
  }
  return (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}>
        <List disablePadding>
          <ListItem onClick={() => setOpenDrawer(false)} divider button>
            <ListItemText className={classes.drawerItem} disableTypography>
              <img
                className={classes.profilePicture}
                src={`${API_URL}/${currentUser.picture.url}`}
              />
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/">
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/projects">
            <ListItemText className={classes.drawerItem} disableTypography>
              Logged in As {currentUser.username}
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/projects">
            <ListItemText className={classes.drawerItem} disableTypography>
              Projects
            </ListItemText>
          </ListItem>

          <ListItem onClick={logout} divider button>
            <ListItemText
              className={[classes.drawerItem, classes.drawerButton]}>
              Logout
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon} disableRipple />
      </IconButton>
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
export default connect(mapStateToProps, actions)(PrivateNavbarSideDrawer);
