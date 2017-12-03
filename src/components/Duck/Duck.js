import React from 'react';
import { shape, string, number, func, bool } from 'prop-types';
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';
import {
  duckContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author
} from './styles.css';

Duck.propTypes = {
  duck: shape({
    avatar: string.isRequired,
    duckId: string.isRequired,
    name: string.isRequired,
    text: string.isRequired,
    timestamp: number.isRequired,
    uid: string.isRequired
  }),
  onClick: func,
  isLiked: bool.isRequired,
  addAndHandleLike: func.isRequired,
  handleDeleteLike: func.isRequired,
  numberOfLikes: number,
  hideReplyBtn: bool.isRequired,
  hideLikeCount: bool.isRequired,
  goToProfile: func.isRequired
};

function Duck({
  duck,
  onClick,
  isLiked,
  addAndHandleLike,
  handleDeleteLike,
  numberOfLikes,
  hideReplyBtn,
  hideLikeCount,
  goToProfile
}) {
  const starIcon = isLiked === true ? likedIcon : icon;
  const starFn = isLiked === true ? handleDeleteLike : addAndHandleLike;
  return (
    <div
      className={duckContainer}
      style={{cursor: hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={onClick}
      role='link'
      tabIndex={0}
    >
      <img src={duck.avatar} className={avatar} alt='facebook avatar' />
      <div className={contentContainer}>
        <div className={header}>
          <div
            onClick={goToProfile}
            className={author}
            role='link'
            tabIndex={0}
          >
            {duck.name}
          </div>
          <div>{formatTimestamp(duck.timestamp)}</div>
        </div>
        <div className={text}>{duck.text}</div>
        <div className={likeReplyContainer}>
          {hideReplyBtn === true
              ? null
              : <Reply className={icon} />}
          <div className={actionContainer}>
            <Star className={starIcon} onClick={e => starFn(duck.duckId, e)} />
            {hideLikeCount === true ? null : <div>{numberOfLikes}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Duck;
