import styled from 'styled-components';

export const MainCard = styled.div<{
  width?: string;
  height?: string;
  borderRadius: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 20px;
  box-shadow: 0px 4px 4px #00000005;
  background-color: ${({ theme }) => theme.mainBground};
  border-radius: ${({ borderRadius }) => borderRadius}; ;
`;
