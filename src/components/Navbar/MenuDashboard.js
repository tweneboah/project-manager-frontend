import React, { useEffect } from "react";
import { setCurrentUser } from "../../redux/actions/users/usersActions";
import { connect } from "react-redux";

import PublicHeaderDashboard from "./Public/PublicHeaderDashboard";
import PrivateHeaderDashboard from "./Private/PrivateHeaderDashboard";

const MenuDashboard = (props) => {
  const { currentUser, setCurrentUser } = props;
  const userAuth = currentUser && currentUser;

  useEffect(() => {
    setCurrentUser();
  }, [setCurrentUser]);

  return (
    <React.Fragment>
      {userAuth === null ? (
        <PublicHeaderDashboard />
      ) : (
        <PrivateHeaderDashboard userAuthImage={""} userAuthUsername={""} />
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
