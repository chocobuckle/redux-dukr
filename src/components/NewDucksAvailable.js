import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { baseDuckContainer } from 'sharedStyles';

NewDucksAvailable.propTypes = {
  handleClick: func.isRequired
};

function NewDucksAvailable({ handleClick }) {
  return (
    <NewDucksAvailableWrapper
      onClick={handleClick}
      role='link'
      tabIndex={0}
    >{'New Ducks Available'}
    </NewDucksAvailableWrapper>
  );
}

const NewDucksAvailableWrapper = styled.div`
  ${baseDuckContainer};
  background: #4a90e2;
  color: #fff;
  text-align: center;

  &:hover {
    background: #1877E6;
    color: #fff;
  }
`;

export default NewDucksAvailable;
