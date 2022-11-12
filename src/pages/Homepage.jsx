import { MainCard } from '../components/Styles';
import { Bed, CalendarV2 } from '../assets/icons';
import styled from 'styled-components';

const LeftContainer = styled.div`
  width: 50%;
  .lil-card-container {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-right: 10px;
    &-card {
      display: flex;
      align-items: center;
      gap: 20px;
      width: 100%;
      &-svg {
        cursor: pointer;
        border-radius: 10px;
        padding: 18px 20px;
        background-color: ${({ theme }) => theme.bgroundSVGMiniCard};
        color: #e23428;
        &:hover {
          background-color: #e23428;
          color: #fff;
        }
      }
      &-content {
        h1 {
          font-size: 30px;
        }
        p {
          color: #787878;
          font-size: 14px;
        }
      }
    }
  }
`;

const Homepage = () => {
  return (
    <LeftContainer>
      <div className='lil-card-container'>
        <MainCard
          className='lil-card-container-card'
          width='auto'
          borderRadius='12px'
        >
          <div className='lil-card-container-card-svg'>
            <Bed width='30px' height='30px' />
          </div>
          <div className='lil-card-container-card-content'>
            <h1>8,461</h1>
            <p>New Booking</p>
          </div>
        </MainCard>
        <MainCard
          className='lil-card-container-card'
          width='auto'
          borderRadius='12px'
        >
          <div className='lil-card-container-card-svg'>
            <CalendarV2 width='30px' height='30px' />
          </div>
          <div className='lil-card-container-card-content'>
            <h1>963</h1>
            <p>Scheduled Room</p>
          </div>
        </MainCard>
      </div>
    </LeftContainer>
  );
};

export default Homepage;
