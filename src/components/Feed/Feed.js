import React from 'react';
import { string, bool, func, arrayOf } from 'prop-types';
import { DuckContainer } from 'containers';
import { errorMsg } from 'sharedStyles/styles.css';
import { newDuckContainer, header } from './styles.css';

NewDucksAvailable.propTypes = {
  handleClick: func.isRequired
};

function NewDucksAvailable({ handleClick }) {
  return (
    <div
      className={newDuckContainer}
      onClick={handleClick}
      role='link'
      tabIndex={0}
    >
      {'New Ducks Available'}
    </div>
  );
}

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
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
      {newDucksAvailable
        ? <NewDucksAvailable handleClick={resetNewDucksAvailable} />
        : null}
      {duckIds.length === 0
            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no ducks yet 😞'}</p>
            : null}
      {duckIds.map(id => (
        <DuckContainer
          duckId={id}
          key={id}
        />
        ))}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>;
}

export default Feed;
