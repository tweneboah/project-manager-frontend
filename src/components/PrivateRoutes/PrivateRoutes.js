import React from "react";
import { connect } from "react-redux";

const PrivateRoute = (ChildComponent) => {
  const Composedcomponent = (props) => {
    const { isLoggin } = props;
    console.log(isLoggin);

    if (isLoggin === null) {
      console.log("I need to leave");
      props.history.push("/");
    }

    return <ChildComponent {...props} />;
  };

  const mapStateToprops = (state) => {
    return {
      isLoggin: state.userAuth.currentuser
    };
  };
  return connect(mapStateToprops)(Composedcomponent);
};

export default PrivateRoute;
