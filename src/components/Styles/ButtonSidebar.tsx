import styled from 'styled-components';

export const ButtonSidebar = styled.button<{ padding: string }>`
  cursor: pointer;
  padding: ${({ padding }) => padding};
  border: 0;
  border-radius: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.buttonSidebarColor};
  background-color: ${({ theme }) => theme.buttonSidebarBground};
`;
