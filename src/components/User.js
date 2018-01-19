import React from 'react';
import { bool, string, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer } from 'containers';
import { errorMsg, subHeader } from 'sharedStyles';

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
    ? <Text>{'This user doesn\'t exist.'}</Text>
    : (
      <div>
        {
          isFetching
            ? null
            : (
              <div>
                <Wrapper>
                  <div>{name}</div>
                </Wrapper>
                {
                  duckIds.map(id => (
                    <DuckContainer
                      duckId={id}
                      key={id}
                    />
                  ))
                }
                {
                  duckIds.size === 0
                    ? <Text>{`It looks like ${name.split(' ')[0]} hasn't made any ducks yet.`}</Text>
                    : null
                }
              </div>
            )
        }
        {
          error
            ? <ErrorMsg>{error}</ErrorMsg>
            : null
        }
      </div>
    );
}

const Text = styled.p`
  ${subHeader}
`;

const Wrapper = styled.div`
  ${subHeader}
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default User;
