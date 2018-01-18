import React from 'react';
import styled from 'styled-components';
import { func, bool } from 'prop-types';

FacebookAuthButton.propTypes = {
  onAuth: func.isRequired,
  isFetching: bool.isRequired
};

function FacebookAuthButton({ onAuth, isFetching }) {
  return (
    <Button onClick={onAuth}>
      {
        isFetching === true
          ? 'Loading'
          : 'Login with Facebook'
      }
    </Button>
  );
}

const Button = styled.button`
  background: #3B5998;
  border-radius: 5px;
  border-width: 0;
  color: #fff;
  cursor: pointer;
  font-size: 25px;
  padding: 15px;

  &:hover {
    background: #1542A0;
  }
`;

export default FacebookAuthButton;
