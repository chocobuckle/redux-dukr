import React from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { default as DuckModal } from 'react-modal'; // eslint-disable-line import/no-named-default
import { formatDuck } from 'helpers/utils';
import { baseTextAreaContainer, baseTextArea, darkBtn } from 'sharedStyles/styles';

Modal.propTypes = {
  closeModal: func.isRequired,
  duckFanout: func.isRequired,
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  updateDuckText: func.isRequired,
  user: objectOf(string.isRequired).isRequired
};

function Modal({
  closeModal,
  duckFanout,
  duckText,
  isOpen,
  isSubmitDisabled,
  openModal,
  updateDuckText,
  user
}) {
  function submitDuck() {
    return duckFanout(formatDuck(duckText, user));
  }
  return (
    <DuckButton role='link' tabIndex={0} onClick={openModal}>
      {'Duck'}
      <DuckModal
        style={duckModalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel='Duck Modal'
      >
        <DuckModalTop>
          <span>{'Compose new Duck'}</span>
          <CloseModal
            onClick={closeModal}
            role='button'
            tabIndex={0}
          >{'X'}
          </CloseModal>
        </DuckModalTop>
        <DuckTextAreaWrapper>
          <DuckTextArea
            onChange={e => updateDuckText(e.target.value)}
            value={duckText}
            maxLength={140}
            type='text'
            placeholder="What's on your mind?"
          />
        </DuckTextAreaWrapper>
        <SubmitDuck
          disabled={isSubmitDisabled}
          onClick={submitDuck}
        >{'Duck'}
        </SubmitDuck>
      </DuckModal>
    </DuckButton>
  );
}

const DuckButton = styled.span`
  ${darkBtn}
  text-decoration: none;
`;

const DuckModalTop = styled.div`
  background: #fff;
  padding: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1877E6;
`;

const CloseModal = styled.span`
  cursor: pointer;
`;

const DuckTextAreaWrapper = styled.div`
  ${baseTextAreaContainer}
`;

const DuckTextArea = styled.textarea`
  ${baseTextArea}
  border-width: 0;
`;

const SubmitDuck = styled.button`
  ${darkBtn}
  margin: 0px auto;
  width: 150px;
  text-align: center;
  display: block;
`;

const duckModalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
};

export default Modal;
