import React from 'react';
import { shape, string, number } from 'prop-types';
import styled, { css } from 'styled-components';
import { formatTimestamp } from 'helpers/utils';
import { clickable, baseAvatar } from 'sharedStyles';

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
  align-items: flex-start;
  display: flex;
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

export default Reply;
