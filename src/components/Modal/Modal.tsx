import { MainCard } from '../Styles';
import { XClose } from '../../assets/icons';
import styled from 'styled-components';

interface IModal {
  closeModalHandler: () => void;
  title: string;
  message: string;
}

const BackDrop = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

// const ModalCard = styled(({borderRadius, ...rest}) => <MainCard {...rest}/>) <{borderRadius: string}>`
const ModalCard = styled(MainCard)<{ borderRadius: string }>`
  position: fixed;
  width: 500px;
  text-align: center;
  left: calc(50% - 250px);
  z-index: 2;
  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  p {
    color: ${({ theme }) => theme.darkGreyToLightGrey};
  }
  @media (max-width: 700px) {
    width: 80%;
    left: 10%;
  }
  @media (max-width: 550px) {
    width: 90%;
    left: 5%;
  }
`;

const XCloseContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 8px;
  top: 8px;
`;

export const Modal: React.FC<IModal> = ({
  closeModalHandler,
  title,
  message,
}) => {
  return (
    <div>
      <BackDrop onClick={closeModalHandler} />
      <ModalCard borderRadius='12px'>
        <XCloseContainer onClick={closeModalHandler}>
          <XClose width='25px' height='25px' />
        </XCloseContainer>
        <h3>{title}</h3>
        <p>{message}</p>
      </ModalCard>
    </div>
  );
};
