import styled from 'styled-components';

export const CheckBoxContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  input {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #135846;
    outline: none;
    cursor: pointer;
    &:checked {
      background-color: #135846;
      position: relative;
      &::before {
        font-size: 19px;
        color: #fff;
        content: '✔';
        position: absolute;
        right: 1px;
        top: -5px;
      }
    }
  }
`;
