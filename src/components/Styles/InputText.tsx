import styled from 'styled-components';

export const InputText = styled.input<{
  padding: string;
  borderRadius: string;
}>`
  width: 100%;
  padding: ${({ padding }) => padding};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  border-radius: ${({ borderRadius }) => borderRadius};
  color: ${({ theme }) => theme.mainColor};
  background-color: transparent;
`;
