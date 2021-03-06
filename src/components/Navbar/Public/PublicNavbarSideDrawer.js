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
  }
}));

const PublicNavbarSideDrawer = () => {
  //Extract classes
  const classes = useStyles();
  //DRAWER
  //check if we are on ios
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);

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
            to="/customsoftware">
            <ListItemText className={classes.drawerItem} disableTypography>
              Custome Software
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/aboutme">
            <ListItemText className={classes.drawerItem} disableTypography>
              About
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/register">
            <ListItemText className={classes.drawerItem} disableTypography>
              Register
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/login">
            <ListItemText className={classes.drawerItem} disableTypography>
              Login
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            component={Link}
            to="/contact">
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact
            </ListItemText>
          </ListItem>

          <ListItem
            onClick={() => setOpenDrawer(false)}
            divider
            button
            className={[classes.drawerItem, classes.drawerButton]}
            component={Link}
            to="/contact">
            <ListItemText>Free Try</ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>

      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.drawerIcon} disableripple="false" />
      </IconButton>
    </React.Fragment>
  );
};

export default PublicNavbarSideDrawer;
