import React from 'react';
import { string, bool, func, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer } from 'containers';
import { NewDucksAvailable } from 'components';
import { errorMsg, subHeader } from 'sharedStyles';

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
    ? <Header>Fetching</Header>
    : (
      <div>
        {
          newDucksAvailable
            ? <NewDucksAvailable handleClick={resetNewDucksAvailable} />
            : null
        }
        {
          duckIds.length === 0
            ? (
              <Header>
                {'Well, this is unfortunate.'}
                <br />
                {'It appears there are no ducks yet! 😞'}
              </Header>
            )
            : null
        }
        {
          duckIds.map(id => (
            <DuckContainer
              duckId={id}
              key={id}
            />
          ))
        }
        {
          error
            ? <ErrorMsg>{error}</ErrorMsg>
            : null
        }
      </div>
    );
}

const Header = styled.h1`
  ${subHeader}
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default Feed;
