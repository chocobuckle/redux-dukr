import React from 'react';
import { string, bool, func, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer } from 'containers';
import { baseDuckContainer, errorMsg, subHeader } from 'sharedStyles/styles';

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

////////////////////////////////////////////////////////////////////////////////

Feed.propTypes = {
  duckIds: arrayOf(string).isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  newDucksAvailable: bool.isRequired,
  resetNewDucksAvailable: func.isRequired
};

function Feed({
  duckIds,
  error,
  isFetching,
  newDucksAvailable,
  resetNewDucksAvailable
}) {
  return isFetching === true
    ? <Header>{'Fetching'}</Header>
    : <div>
      {newDucksAvailable
        ? <NewDucksAvailable handleClick={resetNewDucksAvailable} />
        : null}
      {duckIds.length === 0
            ? <Header>
              {'Well, this is unfortunate.'}
              <br />
              {'It appears there are no ducks yet! 😞'}
            </Header>
            : null}
      {duckIds.map(id => (
        <DuckContainer
          duckId={id}
          key={id}
        />
        ))}
      {error ? <ErrorMsg>{error}</ErrorMsg> : null}
    </div>;
}

const Header = styled.h1`
  ${subHeader}
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default Feed;
