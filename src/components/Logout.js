import React from 'react';
import styled from 'styled-components';
import { center, subHeader } from 'sharedStyles';

function Logout() {
  return (
    <Text>You are now logged out.</Text>
  );
}

const Text = styled.div`
  ${center}
  ${subHeader}
`;

export default Logout;
