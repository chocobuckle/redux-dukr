import React from 'react';
import { func, shape, string, bool } from 'prop-types';
import styled from 'styled-components';
import { DuckContainer, RepliesContainer } from 'containers';
import { darkBtn, errorMsg, subHeader, baseTextAreaContainer, baseTextArea } from 'sharedStyles/styles';
import { formatReply } from 'helpers/utils';

Reply.propTypes = {
  submit: func.isRequired
};

function Reply({ submit }) {
  const handleSubmit = (e) => {
    if (Reply.ref.value.length === 0) return;
    submit(Reply.ref.value, e);
    Reply.ref.value = '';
  };

  return (
    <ReplyTextAreaContainer>
      <ReplyTextArea
        innerRef={ref => (Reply.ref = ref)} // eslint-disable-line no-return-assign
        maxLength={140}
        type='text'
        placeholder='Your reponse'
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </ReplyTextAreaContainer>
  );
}

const ReplyTextAreaContainer = styled.div`
  ${baseTextAreaContainer};
  width: 70%;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  height: 160px;
`;

const ReplyTextArea = styled.textarea`
  ${baseTextArea}
  border: 1px solid #ccc;
  margin: 10px 0;
`;

const Button = styled.button`
  ${darkBtn}
`;

/* ********************************************************************************************** */

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
        isFetching === true
          ? <Fetching>Fetching</Fetching>
          : (
            <DuckContentAndRepliesWrapper>
              <DuckContent>
                <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn />
                <Reply submit={replyText => {
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
  padding: 20px;
  margin: 20px;
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

const Fetching = styled.p`
  ${subHeader}
`;

const ErrorMsg = styled.p`
  ${errorMsg}
`;

export default DuckDetails;
