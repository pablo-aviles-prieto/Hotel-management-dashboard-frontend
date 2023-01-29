import styled from 'styled-components';
import { MainCard } from './MainCard';

export const TableCard = styled(MainCard)`
  padding: 0;
  tbody {
    tr {
      &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.secondBground};
      }
    }
  }
`;
