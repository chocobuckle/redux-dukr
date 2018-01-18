import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { darkBtn, baseTextAreaContainer, baseTextArea } from 'sharedStyles';

ReplyForm.propTypes = {
  handleOnChange: func.isRequired,
  handleSubmit: func.isRequired,
  text: string.isRequired
};

function ReplyForm({ handleOnChange, handleSubmit, text }) {
  return (
    <ReplyTextAreaContainer>
      <ReplyTextArea
        onChange={e => handleOnChange(e)}
        maxLength={140}
        type='text'
        value={text}
        placeholder='Your reponse'
      />
      <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
    </ReplyTextAreaContainer>
  );
}

const ReplyTextAreaContainer = styled.div`
  ${baseTextAreaContainer};
  display: flex;
  flex-direction: column;
  height: 160px;
  margin: 15px auto;
  width: 70%;
`;

const ReplyTextArea = styled.textarea`
  ${baseTextArea}
  border: 1px solid #ccc;
  margin: 10px 0;
`;

const Button = styled.button`
  ${darkBtn}
`;

export default ReplyForm;
