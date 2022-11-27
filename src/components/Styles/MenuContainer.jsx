import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #pages-container {
    display: flex;
    p {
      cursor: pointer;
      padding: 5px 15px;
      border-bottom: 2px solid #d7d7d8;
      text-decoration: none;
      color: inherit;
    }
    .active-page {
      border-color: #135846;
      color: #135846;
      font-weight: 700;
    }
  }
  #buttons-container {
    button {
      margin-right: 25px;
    }
  }
`;
