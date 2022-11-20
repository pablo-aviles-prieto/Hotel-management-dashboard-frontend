import styled from 'styled-components';

export const InputText = styled.input`
  padding: ${({ padding }) => padding};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  border-radius: 6px;
  color: ${({ theme }) => theme.mainColor};
  background-color: transparent;
`;
