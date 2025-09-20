import React from 'react'

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={require("./loading.gif")} alt="loading" className="my-3" />
    </div>
  );
};

export default Spinner;
