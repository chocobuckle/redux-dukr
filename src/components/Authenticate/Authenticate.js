import React from 'react';
import { string, bool, func } from 'prop-types';
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles.css';
import { FacebookAuthButton } from 'components';

Authenticate.propTypes = {
  error: string.isRequired,
  isFetching: bool.isRequired,
  onAuth: func.isRequired
};

function Authenticate({ onAuth, isFetching, error }) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  );
}

export default Authenticate;
