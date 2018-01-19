import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import { FacebookAuthButton } from 'components';
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles';

Authenticate.propTypes = {
  error: string.isRequired,
  onAuth: func.isRequired
};

function Authenticate({ onAuth, error }) {
  return (
    <Wrapper>
      <Header>Authenticate</Header>
      <FacebookAuthButton onAuth={onAuth} />
      {
        error
          ? <ErrorMsg>{error}</ErrorMsg>
          : null
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${centeredContainer}
`;

const Header = styled.h1`
  ${largeHeader}
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default Authenticate;
