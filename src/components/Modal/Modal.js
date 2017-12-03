import React from 'react';
import { objectOf, string, func, bool } from 'prop-types';
import { default as ReactModal } from 'react-modal'; // eslint-disable-line import/no-named-default
import { formatDuck } from 'helpers/utils';
import {
  newDuckTop,
  pointer,
  newDuckInputContainer,
  newDuckInput,
  submitDuckBtn,
  darkBtn
} from './styles.css';

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
};

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
    <span className={darkBtn} role='link' tabIndex={0} onClick={openModal}>
      {'Duck'}
      <ReactModal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal} contentLabel='Duck Modal'>
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={closeModal} role='button' tabIndex={0} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={e => updateDuckText(e.target.value)}
            value={duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?"
          />
        </div>
        <button
          className={submitDuckBtn}
          disabled={isSubmitDisabled}
          onClick={submitDuck}
        >
          {'Duck'}
        </button>
      </ReactModal>
    </span>
  );
}

export default Modal;
