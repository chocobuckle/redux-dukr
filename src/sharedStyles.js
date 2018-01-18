import { css } from 'styled-components';

export const centeredContainer = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const largeHeader = css`
  color: #4a90e2;
  font-size: 100px;
  font-weight: 100;
  margin-bottom: 20px;
`;

export const subHeader = css`
  color: #4a90e2;
  font-size: 35px;
  font-weight: 100;
  line-height: 55px;
  text-align: center;
`;

export const errorMsg = css`
  color: #FF7777;
  font-size: 22px;
  text-align: center;
`;

export const center = css`
  text-align: center;
`;

export const baseTextAreaContainer = css`
  display: flex;
  height: 110px;
  margin: 10px;
`;

export const baseTextArea = css`
  border-radius: 3px;
  flex: 1;
  font-size: 18px;
  padding: 8px 10px;
  resize: none;
`;

export const darkBtn = css`
  background: #4a90e2;
  border-radius: 5px;
  border-style: none;
  border: 1px solid #4a90e2;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 15px;
  text-align: center;

  &:hover {
    background: #1877E6;
  }
`;

export const baseDuckContainer = css`
  border-radius: 5px;
  cursor: pointer;
  margin: 15px auto;
  max-width: 450px;
  padding: 10px;
`;

export const baseAvatar = css`
  border-radius: 3px;
  margin-right: 15px;
  width: 75px;
`;

export const clickable = css`
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
