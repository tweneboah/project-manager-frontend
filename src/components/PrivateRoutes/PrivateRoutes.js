import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  setCurrentUser,
  getMyProfile
} from "../../redux/actions/users/usersActions";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const PrivateRoute = (ChildComponent) => {
  const Composedcomponent = (props) => {
    const { isLoggin, setCurrentUser, getMyProfile } = props;

    useEffect(() => {
      setCurrentUser();
    }, []);

    if (isLoggin === null) {
      props.history.push("/");
    }

    return (
      <div>
        <ChildComponent {...props} />
      </div>
    );
  };

  const actions = {
    setCurrentUser,
    getMyProfile
  };

  const mapStateToprops = (state) => {
    return {
      isLoggin: state.userAuth.currentUser
    };
  };
  return connect(mapStateToprops, actions)(Composedcomponent);
};

export default PrivateRoute;
