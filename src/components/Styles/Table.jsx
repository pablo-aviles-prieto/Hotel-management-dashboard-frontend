import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  thead {
    tr {
      th {
        padding: 20px;
        /* padding-right: 0; */
      }
      th:last-child {
        padding-right: 20px;
      }
    }
  }
  tbody {
    tr {
      border-top: 1px solid ${({ theme }) => theme.borderColor};
      td {
        padding: 20px;
        /* padding-right: 0; */
      }
      td:last-child {
        padding-right: 20px;
      }
    }
    tr:first-child {
      border-width: 2px;
    }
  }
`;
