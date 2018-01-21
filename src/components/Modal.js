import React from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import { default as DuckModal } from 'react-modal'; // eslint-disable-line import/no-named-default
import { formatDuck } from 'helpers/utils';
import { baseTextAreaContainer, baseTextArea, darkBtn } from 'sharedStyles';

DuckModal.setAppElement('body');

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
    <div>
      <DuckButton
        role='link'
        tabIndex={0}
        onClick={openModal}
      >Duck
      </DuckButton>
      <DuckModal
        style={duckModalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel='Duck Modal'
      >
        <DuckModalTop>
          <span>Compose new Duck</span>
          <CloseModal
            onClick={closeModal}
            role='button'
            tabIndex={0}
          >X
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
        >Duck
        </SubmitDuck>
      </DuckModal>
    </div>
  );
}

const DuckButton = styled.span`
  ${darkBtn}
  text-decoration: none;
  outline: none;
`;

const DuckModalTop = styled.div`
  align-items: center;
  background: #fff;
  color: #1877E6;
  display: flex;
  justify-content: space-between;
  padding: 11px;
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
  display: block;
  margin: 0px auto;
  text-align: center;
  width: 150px;

  &:disabled {
    background-color: #c1c1c1;
    border-color: #c1c1c1;
  }
`;

const duckModalStyles = {
  content: {
    background: '#EBEBEB',
    borderRadius: 5,
    height: 220,
    margin: '0px auto',
    padding: 0,
    width: 350
  }
};

export default Modal;
