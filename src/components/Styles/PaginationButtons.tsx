import styled from 'styled-components';

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #pagination-container {
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10px;
    div {
      cursor: pointer;
      padding: 8px 17px;
      border-radius: 8px;
      display: none;
    }
    .selected-page {
      display: block;
      color: #fff;
      background-color: ${({ theme }) => theme.buttonGreenBground};
    }
    .adjacent-page {
      display: block;
      color: ${({ theme }) => theme.mainColor};
    }
    .first-page {
      display: block;
      margin-right: 30px;
      border: 1px solid #135846;
      color: ${({ theme }) => theme.buttonSidebarColor};
      background-color: ${({ theme }) => theme.mainBground};
    }
    .last-page {
      display: block;
      margin-left: 30px;
      border: 1px solid #135846;
      color: ${({ theme }) => theme.buttonSidebarColor};
      background-color: ${({ theme }) => theme.mainBground};
    }
  }
`;
