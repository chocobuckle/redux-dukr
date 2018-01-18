import React from 'react';
import { bool, string, number, shape } from 'prop-types';
import { Reply } from 'components';
import styled from 'styled-components';
import { errorMsg, center } from 'sharedStyles';

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
      {
        error
          ? <RepliesError>{error}</RepliesError>
          : null
      }
      {
        isFetching === true
          ? <p>Fetching Replies</p>
          : (
            <div>
              <Header>Replies</Header>
              {
                replyIds.map(replyId => (
                  <Reply key={replyId} reply={replies[replyId]} />
                ))
              }
            </div>
          )
      }
      {
        replyIds.length === 0
          ? (
            <BeFirstToComment>{'Be the first to comment. '}
              <span
                role='img'
                aria-label='Smiley emoji with cool sunglasses'
              >😎
              </span>
            </BeFirstToComment>
          )
          : null
      }
    </div>
  );
}

const RepliesError = styled.h3`
  ${errorMsg}
`;

const Header = styled.h1`
  font-size: 50px;
  font-weight: 100;
  margin-top: 0;
  text-align: center;
`;

const BeFirstToComment = styled.h3`
  ${center}
`;

export default Replies;
