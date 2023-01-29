import styled from 'styled-components';

export const InputFileContainer = styled.div`
  background-color: ${({ theme }) => theme.lightGreenToGrey};
  text-align: center;
  padding: 5px;
  border-radius: 99px;
  opacity: 1;
  width: calc(50% + 15px);
  margin: 0 auto;
  color: ${({ theme }) => theme.greyToWhite};
  &:hover {
    opacity: 0.9;
  }
  input[type='file'] {
    display: none;
  }
  label {
    cursor: pointer;
    color: ${({ theme }) => theme.greyToWhite};
  }
`;
