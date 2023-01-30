import styled from 'styled-components';
import { MainCard } from './MainCard';

export const TableCard = styled(MainCard)<{ cursor?: string }>`
  padding: 0;
  tbody {
    tr {
      &:hover {
        cursor: ${({ cursor }) => cursor || 'default'};
        background-color: ${({ theme }) => theme.secondBground};
      }
    }
  }
`;
