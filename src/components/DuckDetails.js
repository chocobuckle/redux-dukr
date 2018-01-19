import React from 'react';
import { func, shape, string, bool } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer, RepliesContainer, ReplyFormContainer } from 'containers';
import { errorMsg } from 'sharedStyles';
import { formatReply } from 'helpers/utils';

DuckDetails.propTypes = {
  authedUser: shape({
    name: string.isRequired,
    avatar: string.isRequired,
    uid: string.isRequired
  }).isRequired,
  duckId: string.isRequired,
  isFetching: bool.isRequired,
  error: string.isRequired,
  addAndHandleReply: func.isRequired
};

function DuckDetails({ duckId, isFetching, authedUser, error, addAndHandleReply }) {
  return (
    <DuckDetailsWrapper>
      {
        isFetching
          ? null
          : (
            <DuckContentAndRepliesWrapper>
              <DuckContent>
                <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn />
                <ReplyFormContainer submit={replyText => {
                  addAndHandleReply(duckId, formatReply(authedUser, replyText));
                }}
                />
              </DuckContent>
              <RepliesWrapper>
                <RepliesContainer duckId={duckId} />
              </RepliesWrapper>
            </DuckContentAndRepliesWrapper>
          )
      }
      {
        error ? <ErrorMsg>{error}</ErrorMsg> : null
      }
    </DuckDetailsWrapper>
  );
}

const DuckDetailsWrapper = styled.div`
  margin: 20px;
  padding: 20px;
`;

const DuckContentAndRepliesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const DuckContent = styled.div`
  flex: 4;
`;

const RepliesWrapper = styled.div`
  flex: 3;
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default DuckDetails;
