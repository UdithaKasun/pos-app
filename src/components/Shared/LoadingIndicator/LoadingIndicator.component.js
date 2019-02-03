import React from "react";
import Loader from "react-loader-spinner";

const LoadingIndicator = ({ loading }) => {
  if (loading) {
    return (
      <div className="centerItem">
        <Loader type="ThreeDots" color="#337ab7" height="100" width="100" />
      </div>
    );
  }
  return null;
};

export default LoadingIndicator;
