import React from 'react';
import { shape, string, number, func, bool } from 'prop-types';
import styled from 'styled-components';
import { formatTimestamp } from 'helpers/utils';
import Reply from 'react-icons/lib/fa/mail-reply';
import Star from 'react-icons/lib/fa/star';
import { baseDuckContainer, baseAvatar, clickable } from 'sharedStyles/styles';

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
          {hideReplyBtn === true
              ? null
              : <ReplyIcon />}
          <ActionWrapper>
            <Star style={starIcon} onClick={e => starFn(duck.duckId, e)} />
            {hideLikeCount === true ? null : <div>{numberOfLikes}</div>}
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    background: #F1F1F1;
  }
`;

const DuckAvatar = styled.img`
  ${baseAvatar};
`;

const DuckContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

const DuckHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

const DuckAuthor = styled.div`
  ${clickable};
`;

const DuckText = styled.div`
  padding: 8px 0;
  font-size: 20px;
  line-height: 25px;
`;

const LikeReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  font-size: 18px
`;

export default Duck;
