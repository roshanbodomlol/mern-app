import React from 'react';
import PropTypes from 'prop-types';

import loadingGIF from '../../Images/loader_infinity.gif';
import './index.css';

const LoadingScreen = (props) => {
  return (
    <div>
      {
        props.isLoading ? <div className="loading-wrap"><img src={loadingGIF} alt="" /></div> : ''
      }
    </div>
  );
};

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default LoadingScreen;
