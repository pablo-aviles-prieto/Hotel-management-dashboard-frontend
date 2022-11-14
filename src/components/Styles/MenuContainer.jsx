import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #links-container {
    display: flex;
    a {
      padding: 5px 15px;
      border-bottom: 2px solid #d7d7d8;
      text-decoration: none;
      color: inherit;
    }
    .link-active {
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
