import React from 'react';
import { bool, string, number, shape } from 'prop-types';
import styled, { css } from 'styled-components';
import { formatTimestamp } from 'helpers/utils';
import { errorMsg, clickable, baseAvatar, center } from 'sharedStyles/styles';

Reply.propTypes = {
  reply: shape({
    avatar: string.isRequired,
    name: string.isRequired,
    reply: string.isRequired,
    replyId: string.isRequired,
    timestamp: number.isRequired,
    uid: string.isRequired
  }).isRequired
};

function Reply({ reply }) {
  return (
    <ReplyWrapper>
      <Avatar src={reply.avatar} alt={reply.name} />
      <div>
        <AuthorName>{reply.name}</AuthorName>
        <ReplyTime>{formatTimestamp(reply.timestamp)}</ReplyTime>
        <ReplyText>{reply.reply}</ReplyText>
      </div>
    </ReplyWrapper>
  );
}

const ReplyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  font-size: 18px;
  margin: 7px;
  padding: 15px;
`;

const Avatar = styled.img`
  ${baseAvatar}
`;

const AuthorName = styled.div`
  ${clickable}
  font-weight: bold;
`;

const Cushion = css`
  padding: 5px 0;
`;

const ReplyTime = styled.div`
  ${Cushion}
`;

const ReplyText = styled.div`
  ${Cushion}
`;

/******************************************************************************/

Replies.propTypes = {
  error: string.isRequired,
  isFetching: bool.isRequired,
  replies: shape({
    avatar: string,
    name: string,
    reply: string,
    replyId: string,
    timestamp: number,
    uid: string
  }).isRequired
};

function Replies({ replies, error, isFetching }) {
  const replyIds = Object.keys(replies);
  return (
    <div>
      {error ? <RepliesError>{error}</RepliesError> : null}
      {isFetching === true
        ? <p>{'Fetching Replies'}</p>
        : <div>
          <Header>{'Replies'}</Header>
          {replyIds.map(replyId => (
            <Reply key={replyId} reply={replies[replyId]} />
            ))}
        </div>}
      {replyIds.length === 0
        ? <BeFirstToComment>{'Be the first to comment. 😎'}</BeFirstToComment>
        : null}
    </div>
  );
}

const RepliesError = styled.h3`
  ${errorMsg}
`;

const Header = styled.h1`
  text-align: center;
  font-weight: 100;
  font-size: 50px;
  margin-top: 0;
`;

const BeFirstToComment = styled.h3`
  ${center}
`;

export default Replies;
