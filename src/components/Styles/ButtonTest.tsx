import styled from 'styled-components';

interface IButtonTest {
  children: JSX.Element;
  color: string;
  pad: string;
}

const ButtonTestGreen = styled.button<{ padding: string; btnColor: string }>`
  cursor: pointer;
  padding: ${({ padding }) => padding};
  border: 0;
  border-radius: 14px;
  color: ${({ btnColor }) => btnColor};
  background-color: ${({ theme }) => theme.blackToWhite};
`;

export const ButtonTest: React.FC<IButtonTest> = ({ children, color, pad }) => {
  return (
    <ButtonTestGreen padding={pad} btnColor={color}>
      {children}
    </ButtonTestGreen>
  );
};
