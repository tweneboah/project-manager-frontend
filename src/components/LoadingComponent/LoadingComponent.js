import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingComponent = () => {
  return <Loader type="Puff" color="#e84393" height={100} width={100} />;
};

export default LoadingComponent;
