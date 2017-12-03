import React from 'react';
import { func, shape, string, bool } from 'prop-types';
import { DuckContainer, RepliesContainer } from 'containers';
import { darkBtn, errorMsg, subHeader } from 'sharedStyles/styles.css';
import { formatReply } from 'helpers/utils';
import {
  container,
  content,
  mainContainer,
  repliesContainer,
  replyTextArea,
  replyTextAreaContainer
} from './styles.css';

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
    <div className={replyTextAreaContainer}>
      <textarea
        className={replyTextArea}
        ref={ref => (Reply.ref = ref)} // eslint-disable-line no-return-assign
        maxLength={140}
        type='text'
        placeholder='Your reponse'
      />
      <button
        onClick={handleSubmit}
        className={darkBtn}
      >
        {'Submit'}
      </button>
    </div>
  );
}

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
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
          <div className={content}>
            <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn />
            <Reply submit={replyText => {
              addAndHandleReply(duckId, formatReply(authedUser, replyText));
            }}
            />
          </div>
          <div className={repliesContainer}>
            <RepliesContainer duckId={duckId} />
          </div>
        </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  );
}

export default DuckDetails;
