import styled from 'styled-components';

export const FlexContainer = styled.div<{
  gap?: string;
}>`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => (gap ? gap : '10px')};
`;
