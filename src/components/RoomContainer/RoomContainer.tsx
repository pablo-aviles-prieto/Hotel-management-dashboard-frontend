import { FlexContainer, ImgHolder, MainCard, ButtonGreen } from '../Styles';
import {
  DoubleBed,
  AirConditioner,
  LedTV,
  Coffee,
} from '../../assets/icons/facilities';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  hr {
    margin: 35px 0;
    height: 2px;
    background-color: ${({ theme }) => theme.greyToGreen};
    border: 0;
    border-radius: 10px;
  }
  .side-container {
    width: 50%;
  }
  .info-data-block {
    p {
      font-size: 15px;
      font-weight: 700;
    }
    p:first-child {
      color: ${({ theme }) => theme.darkGreyToLightGrey};
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 5px;
    }
    #room-description {
      font-weight: 400;
    }
  }
  .info {
    &-name {
      &-id {
        align-items: baseline;
        gap: 5px;
        margin-bottom: 12px;
        p {
          font-size: 22px;
          font-weight: 700;
        }
        #room-number {
          font-weight: 400;
          font-size: 12px;
          color: ${({ theme }) => theme.darkGreyToLightGrey};
        }
      }
      &-type {
        div {
          width: 100%;
        }
      }
    }
    &-room {
      &-details {
        div {
          width: 100%;
        }
        &-price {
          #official-price {
            span {
              color: ${({ theme }) => theme.darkGreyToLightGrey};
              font-size: 10px;
            }
          }
        }
      }
      &-description {
        margin: 30px 0;
      }
      &-facilities {
        &-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
          gap: 20px;
          &-individuals {
            border-radius: 8px;
            display: inline-block;
            padding: 10px 20px;
            color: ${({ theme }) => theme.buttonSidebarColor};
            background-color: ${({ theme }) => theme.buttonSidebarBground};
            p {
              font-size: 13px;
            }
            .initial-mod {
              align-items: end;
            }
          }
        }
      }
    }
  }
`;

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

export const RoomContainer: React.FC = () => {
  return (
    <Container>
      <MainCard borderRadius='16px 0 0 16px' className='side-container info'>
        <div className='info-name'>
          <FlexContainer className='info-name-id'>
            <p>Random Name details</p>
            <p id='room-number'>ID: 981240</p>
          </FlexContainer>
          <FlexContainer className='info-name-type'>
            <div className='info-data-block'>
              <p>Room type</p>
              <p>Random type</p>
            </div>
            <div className='info-data-block'>
              <p>Bed type</p>
              <p>Random bed type</p>
            </div>
          </FlexContainer>
        </div>
        <hr />
        <div className='info-room'>
          <FlexContainer className='info-room-details'>
            <div className='info-room-details-offer'>
              <div className='info-data-block'>
                <p>Offer price</p>
                <p>No offer available</p>
              </div>
            </div>
            <div className='info-room-details-price'>
              <div className='info-data-block'>
                <p>Price</p>
                <p id='official-price'>
                  $400 <span>/night</span>
                </p>
              </div>
            </div>
          </FlexContainer>
          <div className='info-room-description'>
            <p id='room-description'>
              Random description that is a bit shortlined
            </p>
          </div>
          <div className='info-data-block info-room-facilities'>
            <p>Facilities</p>
            <div className='info-room-facilities-container'>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <DoubleBed height={22} />
                  <p>Beedroom</p>
                </FlexContainer>
              </div>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <DoubleBed height={22} />
                  <p>Beedroom</p>
                </FlexContainer>
              </div>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <AirConditioner height={22} />
                  <p>Air Conditioner</p>
                </FlexContainer>
              </div>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <LedTV height={22} />
                  <p>Led TV</p>
                </FlexContainer>
              </div>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <DoubleBed height={22} />
                  <p>Beedroom</p>
                </FlexContainer>
              </div>
              <div className='info-room-facilities-container-individuals'>
                <FlexContainer className='initial-mod'>
                  <Coffee height={22} />
                  <p>Coffee</p>
                </FlexContainer>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='info-data-block'>
          <p>Actions</p>
          <FlexContainer>
            <ButtonGreen
              padding='10px 52px'
              style={{ width: '100%' }}
              // onClick={() => navigate(`/rooms/${id}/edit`)}
            >
              Edit room
            </ButtonGreen>
            {/* <RedButton padding='10px 52px' onClick={deleteRoomHandler}> */}
            <RedButton padding='10px 52px' style={{ width: '100%' }}>
              Delete room
            </RedButton>
          </FlexContainer>
        </div>
      </MainCard>
      <div className='side-container'>
        <ImgHolder
          style={{ borderRadius: '0 16px 16px 0' }}
          height='100%'
          width='auto'
        ></ImgHolder>
      </div>
    </Container>
  );
};
