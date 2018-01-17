import React from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';
import { FacebookAuthButton } from 'components';
import { centeredContainer, largeHeader, errorMsg } from 'sharedStyles/styles';

Authenticate.propTypes = {
  error: string.isRequired,
  isFetching: bool.isRequired,
  onAuth: func.isRequired
};

function Authenticate({ onAuth, isFetching, error }) {
  return (
    <Wrapper>
      <Header>Authenticate</Header>
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />
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
