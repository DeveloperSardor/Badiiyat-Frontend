import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="flex justify-center my-3 p-3 items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  );
};

export default SpinnerLoader;
