import styled from 'styled-components';

export const ButtonGreen = styled.button<{ padding: string }>`
  cursor: pointer;
  padding: ${({ padding }) => padding};
  border: 0;
  border-radius: 12px;
  color: ${({ theme }) => theme.buttonGreenColor};
  background-color: ${({ theme }) => theme.buttonGreenBground};
`;
