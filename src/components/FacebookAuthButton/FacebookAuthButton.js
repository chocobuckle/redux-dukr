import React from 'react';
import { func, bool } from 'prop-types';
import { button } from './styles.css';

FacebookAuthButton.propTypes = {
  onAuth: func.isRequired,
  isFetching: bool.isRequired
};

function FacebookAuthButton({ onAuth, isFetching }) {
  return (
    <button onClick={onAuth} className={button}>
      {isFetching === true
        ? 'Loading'
        : 'Login with Facebook'}
    </button>
  );
}

export default FacebookAuthButton;
