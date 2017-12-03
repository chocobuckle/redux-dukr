import React from 'react';
import { bool, string, number, object, instanceOf, shape } from 'prop-types';
import { formatTimestamp } from 'helpers/utils';
import { errorMsg } from 'sharedStyles/styles.css';
import {
  author,
  avatar,
  center,
  cushion,
  header,
  replyContainer
} from './styles.css';

Reply.propTypes = {
  comment: shape({
    avatar: string.isRequired,
    name: string.isRequired,
    reply: string.isRequired,
    replyId: string.isRequired,
    timestamp: number.isRequired,
    uid: string.isRequired
  }).isRequired
};

function Reply({ comment }) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar} />
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimestamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  );
}

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
      {error ? <h3 className={errorMsg}>{error}</h3> : null}
      {isFetching === true
        ? <p>{'Fetching Replies'}</p>
        : <div>
          <h1 className={header}>{'Replies'}</h1>
          {replyIds.map(replyId => (
            <Reply key={replyId} comment={replies[replyId]} />
            ))}
        </div>}
      {replyIds.length === 0 ? <h3 className={center}>{'Be the first to comment. 😎'}</h3> : null}
    </div>
  );
}

export default Replies;
