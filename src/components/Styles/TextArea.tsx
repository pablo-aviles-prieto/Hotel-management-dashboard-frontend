import styled from 'styled-components';

export const TextArea = styled.textarea<{ width?: string }>`
  padding: 5px;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  width: ${({ width }) => width || 'auto'};
  min-width: 175px;
`;
