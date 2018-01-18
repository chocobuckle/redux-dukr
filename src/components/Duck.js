import React from 'react';
import { shape, string, number, func, bool } from 'prop-types';
import styled from 'styled-components';
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';
import { baseDuckContainer, baseAvatar, clickable } from 'sharedStyles';

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
  const starIcon = isLiked === true
    ? {
      color: '#4a90e2',
      height: 25,
      width: 25,
      marginRight: 5,
      cursor: 'pointer',
      transition: 'all .2s ease-in-out'
    }
    : {
      height: 25,
      width: 25,
      marginRight: 5,
      cursor: 'pointer',
      transition: 'all .2s ease-in-out'
    };
  const starFn = isLiked === true ? handleDeleteLike : addAndHandleLike;
  return (
    <DuckWrapper
      style={{cursor: hideReplyBtn === true ? 'default' : 'pointer'}}
      onClick={onClick}
      role='link'
      tabIndex={0}
    >
      <DuckAvatar src={duck.avatar} alt='facebook avatar' />
      <DuckContentWrapper>
        <DuckHeader>
          <DuckAuthor
            onClick={goToProfile}
            role='link'
            tabIndex={0}
          >{duck.name}
          </DuckAuthor>
          <div>{formatTimestamp(duck.timestamp)}</div>
        </DuckHeader>
        <DuckText>{duck.text}</DuckText>
        <LikeReplyWrapper>
          {
            hideReplyBtn === true
              ? null
              : <ReplyIcon />
          }
          <ActionWrapper>
            <Star style={starIcon} onClick={e => starFn(duck.duckId, e)} />
            {
              hideLikeCount === true
                ? null
                : <div>{numberOfLikes}</div>
            }
          </ActionWrapper>
        </LikeReplyWrapper>
      </DuckContentWrapper>
    </DuckWrapper>
  );
}

const ReplyIcon = styled(Reply)`
  ${clickable};
  height: 25px;
  width: 25px;
  margin-right: 5px;
`;

const DuckWrapper = styled.div`
  ${baseDuckContainer};
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  &:hover {
    background: #F1F1F1;
  }
`;

const DuckAvatar = styled.img`
  ${baseAvatar};
`;

const DuckContentWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const DuckHeader = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  font-weight: bold;
  justify-content: space-between;
  width: 100%;
`;

const DuckAuthor = styled.div`
  ${clickable};
`;

const DuckText = styled.div`
  font-size: 20px;
  line-height: 25px;
  padding: 8px 0;
`;

const LikeReplyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ActionWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  margin-right: 15px;
`;

export default Duck;
