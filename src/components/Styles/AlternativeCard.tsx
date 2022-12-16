import styled from 'styled-components';

export const AlternativeCard = styled.div<{
  width?: string;
  height?: string;
  borderRadius: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 20px;
  box-shadow: 0px 4px 4px #00000005;
  background-color: ${({ theme }) => theme.mainBground};
  border: 1px solid ${({ theme }) => theme.borderCardSeparator};
  border-radius: ${({ borderRadius }) => borderRadius};
  transition: box-shadow 0.4s ease-out;
  &:hover {
    box-shadow: 0px 16px 30px #00000014;
    transition: box-shadow 0.4s ease-out;
  }
`;
