import React from 'react';
import { bool, string, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer } from 'containers';
import { errorMsg, subHeader } from 'sharedStyles/styles';

User.propTypes = {
  duckIds: arrayOf(string).isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  name: string.isRequired,
  noUser: bool.isRequired
};

const Text = styled.p`
  ${subHeader}
`;

const Wrapper = styled.div`
  ${subHeader}
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

function User({
  duckIds,
  error,
  isFetching,
  name,
  noUser
}) {
  return noUser === true
    ? <Text>{'This user doesnt exist.'}</Text>
    : <div>
      {isFetching === true
          ? <Text>{'Loading'}</Text>
          : <div>
            <Wrapper>
              <div>{name}</div>
            </Wrapper>
            {duckIds.map(id => (
              <DuckContainer
                duckId={id}
                key={id}
              />
              ))}
            {duckIds.size === 0
                ? <Text>
                  {`It looks like ${name.split(' ')[0]} hasn't made any ducks yet.`}
                </Text>
                : null}
          </div>}
      {error ? <ErrorMsg>{error}</ErrorMsg> : null}
    </div>;
}

export default User;
