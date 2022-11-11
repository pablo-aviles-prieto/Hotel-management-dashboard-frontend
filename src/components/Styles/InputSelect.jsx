import styled from 'styled-components';

export const InputSelect = styled.select`
  padding: ${({ padding }) => padding};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  border-radius: 12px;
  color: #135846;
  font-weight: 700;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='grey' height='30' viewBox='0 0 24 24' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: ${({ positionArrowY }) => positionArrowY};
  padding-right: 40px;
  option {
    color: #135846;
    background-color: ${({ theme }) => theme.secondBground};
  }
`;
