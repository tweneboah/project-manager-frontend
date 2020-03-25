import React, { useEffect } from "react";

import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { setCurrentUser } from "../../redux/actions/users/usersActions";
import { connect } from "react-redux";

import PublicHeaderDashboard from "./Public/PublicHeaderDashboard";
import PrivateHeaderDashboard from "./Private/PrivateHeaderDashboard";
import avatar from "../../images/avatar.png";
const MenuDashboard = (props) => {
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  let userAuth = null;

  if (currentUser) {
    console.log(currentUser.user);
    userAuth = currentUser.user;
  }
  console.log(userAuth);
  return (
    <React.Fragment>
      {userAuth === null ? (
        <PublicHeaderDashboard />
      ) : (
        <PrivateHeaderDashboard
          userAuthImage={userAuth && userAuth.picture.url}
          userAuthUsername={userAuth && userAuth.username}
        />
      )}
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
export default connect(mapStateToProps, actions)(MenuDashboard);
