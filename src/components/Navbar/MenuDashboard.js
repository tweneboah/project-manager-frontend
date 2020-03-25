import React, { useEffect } from "react";

import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import {
  setCurrentUser,
  getMyProfile
} from "../../redux/actions/users/usersActions";
import { connect } from "react-redux";

import PublicHeaderDashboard from "./Public/PublicHeaderDashboard";
import PrivateHeaderDashboard from "./Private/PrivateHeaderDashboard";

const MenuDashboard = (props) => {
  const { profile, setCurrentUser } = props;

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return (
    <React.Fragment>
      {profile === null || !profile ? (
        <PublicHeaderDashboard />
      ) : (
        <PrivateHeaderDashboard />
      )}
    </React.Fragment>
  );
};

const actions = {
  setCurrentUser,
  getMyProfile
};

const mapStateToProps = (state) => {
  return {
    profile: state.userAuth.myProfile
  };
};
export default connect(mapStateToProps, actions)(MenuDashboard);
