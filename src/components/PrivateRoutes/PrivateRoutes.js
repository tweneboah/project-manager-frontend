import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setCurrentUser,
  getMyProfile
} from "../../redux/actions/users/usersActions";

const PrivateRoute = (ChildComponent) => {
  const Composedcomponent = (props) => {
    const { currentUser } = props;

    if (currentUser === null) {
      props.history.push("/");
    }

    return (
      <div>
        <ChildComponent {...props} />
      </div>
    );
  };

  const mapStateToprops = (state) => {
    return {
      currentUser: state.userAuth.currentUser
    };
  };
  return connect(mapStateToprops, null)(Composedcomponent);
};

export default PrivateRoute;
