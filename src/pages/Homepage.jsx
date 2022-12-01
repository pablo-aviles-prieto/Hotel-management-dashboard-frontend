import {
  MainCard,
  AlternativeCard,
  ImgHolder,
  MenuContainer,
} from '../components/Styles';
import {
  Bed,
  CalendarV2,
  Login,
  Logout,
  Check,
  XCircle,
} from '../assets/icons';
import { BarChart } from '../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from 'styled-components';
import { useContainerDimensions } from '../utils';
import RightArrowIcon from '../assets/icons/RightArrowLong.svg';
import LeftArrowIcon from '../assets/icons/LeftArrowLong.svg';
import statsWeekly from '../assets/data/stats-weekly.json';
import statsMonthly from '../assets/data/stats-monthly.json';

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
  margin-top: 20px;
  .side-container {
    width: 50%;
    &-top-card {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 20px;
      height: 476px;
    }
  }
  #mid-left-container {
    padding-right: 10px;
  }
  #mid-right-container {
    padding-left: 10px;
  }
`;

const BottomSection = styled.section`
  .reserve-info {
    margin-top: 20px;
  }
  .reviews {
    margin: 20px 0;
    &-title {
      font-weight: 700;
      margin-bottom: 20px;
      padding: 0 30px;
    }
    &--flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 10px;
      transform: scale(1);
    }
    .swiper {
      position: relative;
      padding: 30px;
    }
    .swiper-button-next,
    .swiper-button-prev {
      position: fixed;
      top: 50%;
      width: 40px;
      height: 40px;
      background-color: #135846;
      color: #fff;
      border-radius: 6px;
    }
    .swiper-button-next {
      background-image: url(${RightArrowIcon});
      right: -30px;
    }
    .swiper-button-prev {
      background-image: url(${LeftArrowIcon});
      left: -30px;
    }
    .swiper-button-disabled {
      display: none;
    }
    .swiper-button-next::after {
      content: '';
    }
    .swiper-button-prev::after {
      content: '';
    }
  }
  .slider-container {
    &-content {
      color: ${({ theme }) => theme.greyToWhite};
    }
    &-author {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      &-info {
        display: flex;
        align-items: center;
        gap: 20px;
        &--flex {
          #author-name {
            font-weight: 700;
            font-size: 16px;
          }
          #publish-date {
            color: #799283;
            font-size: 14px;
          }
        }
      }
      &-btns {
        cursor: pointer;
        min-width: 80px;
        svg {
          margin-left: 10px;
        }
      }
    }
  }
`;

const Homepage = () => {
  const [statsToShow, setStatsToShow] = useState('weekly');
  const divStatsRef = useRef(null);
  const { width: statsContainerWidth } = useContainerDimensions(divStatsRef);

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
          <MainCard className='side-container-top-card' borderRadius='16px'>
            <h1>Calendar</h1>
          </MainCard>
        </div>
        <div id='mid-right-container' className='side-container'>
          <MainCard className='side-container-top-card' borderRadius='16px'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h3>Reservation stats</h3>
              <MenuContainer>
                <div id='pages-container'>
                  <p
                    onClick={() => setStatsToShow('weekly')}
                    className={statsToShow === 'weekly' ? 'active-page' : ''}
                  >
                    Weekly
                  </p>
                  <p
                    onClick={() => setStatsToShow('monthly')}
                    className={statsToShow === 'monthly' ? 'active-page' : ''}
                  >
                    Monthly
                  </p>
                </div>
              </MenuContainer>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '13px',
                    height: '13px',
                    backgroundColor: '#135846',
                    marginRight: '20px',
                  }}
                />
                Occupancy
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '13px',
                    height: '13px',
                    backgroundColor: '#e23428',
                    marginRight: '20px',
                  }}
                />
                Sales
              </div>
            </div>
            <div ref={divStatsRef}>
              <BarChart
                data={statsToShow === 'weekly' ? statsWeekly : statsMonthly}
                containerWidth={statsContainerWidth}
              />
            </div>
          </MainCard>
        </div>
      </MidSection>
      <BottomSection id='bottom-container'>
        <MainCard className='reserve-info' height='450px' borderRadius='16px'>
          <h1>Reserve info</h1>
        </MainCard>
        <MainCard className='reviews' borderRadius='16px'>
          <p className='reviews-title'>Latest Review by Customers</p>
          <div className='reviews--flex'>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className='mySwiper'
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                900: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
              <SwiperSlide>
                <AlternativeCard
                  className='slider-container'
                  borderRadius='16px'
                >
                  <p className='slider-container-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam
                  </p>
                  <div className='slider-container-author'>
                    <div className='slider-container-author-info'>
                      <ImgHolder width='56px' height='56px'></ImgHolder>
                      <div className='slider-container-author-info--flex'>
                        <p id='author-name'>Manolito Garcia</p>
                        <p id='publish-date'>4m ago</p>
                      </div>
                    </div>
                    <div className='slider-container-author-btns'>
                      <Check stroke='#5AD07A' width='30px' height='30px' />
                      <XCircle stroke='#E23428' width='30px' height='30px' />
                    </div>
                  </div>
                </AlternativeCard>
              </SwiperSlide>
            </Swiper>
          </div>
        </MainCard>
      </BottomSection>
    </>
  );
};

export default Homepage;
