import styled from 'styled-components';

export const ImgHolder = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #c5c5c5;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
