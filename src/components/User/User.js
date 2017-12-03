import React from 'react';
import { bool, string, arrayOf } from 'prop-types';
import { DuckContainer } from 'containers';
import { errorMsg } from 'sharedStyles/styles.css';
import { userContainer, header } from './styles.css';

User.propTypes = {
  duckIds: arrayOf(string).isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  name: string.isRequired,
  noUser: bool.isRequired
};

function User({
  duckIds,
  error,
  isFetching,
  name,
  noUser
}) {
  return noUser === true
    ? <p className={header}>{'This user doesnt exist.'}</p>
    : <div>
      {isFetching === true
          ? <p className={header}>{'Loading'}</p>
          : <div>
            <div className={userContainer}>
              <div>{name}</div>
            </div>
            {duckIds.map(id => (
              <DuckContainer
                duckId={id}
                key={id}
              />
              ))}
            {duckIds.size === 0
                ? <p className={header}>
                  {`It looks like ${name.split(' ')[0]} hasn't made any ducks yet.`}
                </p>
                : null}
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>;
}

export default User;
