import React from 'react';

const Loader = (props) => (
  <div className="loader">
    <img src="/images/ball.svg" alt="Loading..." />
    <h2>{props.message}</h2>
  </div>
);

Loader.propTypes = {
  message: React.PropTypes.string
};

export default Loader;
