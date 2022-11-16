import styled from 'styled-components';

const ButtonTestGreen = styled.button`
  cursor: pointer;
  padding: ${({ padding }) => padding};
  border: 0;
  border-radius: 14px;
  color: ${({ btnColor }) => btnColor};
  background-color: ${({ theme }) => theme.buttonGreenBground};
`;

export const ButtonTest = ({ children, color, pad }) => {
  return (
    <ButtonTestGreen padding={pad} btnColor={color}>
      {children}
    </ButtonTestGreen>
  );
};
