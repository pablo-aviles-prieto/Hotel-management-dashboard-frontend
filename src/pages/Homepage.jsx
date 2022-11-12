import { MainCard } from '../components/Styles';
import { Bed, CalendarV2, Login, Logout } from '../assets/icons';
import styled from 'styled-components';

const TopSection = styled.section`
  display: flex;
  align-items: center;
  gap: 20px;
  .lil-card-container {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 50%;
    &-card {
      display: flex;
      align-items: center;
      gap: 20px;
      width: 100%;
      &-svg {
        cursor: pointer;
        display: flex;
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

const MidSection = styled.section`
  display: flex;
  margin: 20px 0;
  .side-container {
    width: 50%;
    &-top-card,
    &-bottom-card,
    &-bottom-stats {
      height: 476px;
    }
    &-bottom-card {
      border-top: 1px solid ${({ theme }) => theme.borderCardSeparator};
    }
    &-bottom-stats {
      padding-top: 20px;
      &-today {
        display: flex;
        gap: 20px;
        &--flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        &-bar {
        }
      }
    }
  }
  #mid-left-container {
    padding-right: 10px;
  }
  #mid-right-container {
    padding-left: 10px;
  }
`;

const Homepage = () => {
  return (
    <>
      <TopSection id='top-container'>
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
        <div className='lil-card-container'>
          <MainCard
            className='lil-card-container-card'
            width='auto'
            borderRadius='12px'
          >
            <div className='lil-card-container-card-svg'>
              <Login width='30px' height='30px' />
            </div>
            <div className='lil-card-container-card-content'>
              <h1>753</h1>
              <p>Check in</p>
            </div>
          </MainCard>
          <MainCard
            className='lil-card-container-card'
            width='auto'
            borderRadius='12px'
          >
            <div className='lil-card-container-card-svg'>
              <Logout width='30px' height='30px' />
            </div>
            <div className='lil-card-container-card-content'>
              <h1>516</h1>
              <p>Check Out</p>
            </div>
          </MainCard>
        </div>
      </TopSection>
      <MidSection id='mid-container'>
        <div id='mid-left-container' className='side-container'>
          <MainCard
            className='side-container-top-card'
            borderRadius='16px 16px 0 0'
          >
            <h1>Calendar</h1>
          </MainCard>
          <MainCard
            className='side-container-bottom-card'
            borderRadius='0 0 16px 16px'
          >
            <h1>Calendar Bottom</h1>
          </MainCard>
        </div>
        <div id='mid-right-container' className='side-container'>
          <MainCard className='side-container-top-card' borderRadius='16px'>
            <h1>Stats</h1>
          </MainCard>
          <div className='side-container-bottom-stats'>
            <div className='side-container-bottom-stats-today'>
              <MainCard
                width='50%'
                borderRadius='12px'
                style={{
                  backgroundColor: '#135846',
                  color: '#fff',
                  padding: '30px 20px',
                }}
              >
                <div className='side-container-bottom-stats-today--flex'>
                  <p>Available Room Today</p>
                  <h3>683</h3>
                </div>
                <div className='side-container-bottom-stats-today-bar'>
                  <h1>progress bar</h1>
                </div>
              </MainCard>
              <MainCard
                width='50%'
                borderRadius='12px'
                style={{
                  backgroundColor: '#135846',
                  color: '#fff',
                  padding: '30px 20px',
                }}
              ></MainCard>
            </div>
          </div>
        </div>
      </MidSection>
    </>
  );
};

export default Homepage;
