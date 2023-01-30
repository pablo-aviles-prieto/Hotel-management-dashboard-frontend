import { FlexContainer, ImgHolder, MainCard } from '../Styles';
import { DoubleBed } from '../../assets/icons/facilities';
import { IFacility, facilitiesArray } from '../../utils/facilitiesArray';
import styled from 'styled-components';

type IRoom = {
  bedType: string;
  facilities: string[];
  id?: string;
  offerPrice?: number | null;
  photo: string;
  ratePerNight: number;
  roomDescription?: string;
  roomFloor: string;
  roomName: string;
  roomNumber: number;
  roomType: string;
  status: string;
};
interface IProps {
  room: IRoom;
  renderButtons: () => JSX.Element;
}

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
    #price-modifier {
      color: ${({ theme }) => theme.darkGreyToLightGrey};
      font-size: 10px;
    }
    #price-offer {
      font-size: 30px;
      color: #04a004;
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
            font-size: 25px;
          }
        }
      }
      &-description {
        margin: 30px 0;
      }
      &-facilities {
        &-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          text-align: center;
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

export const RoomContainer: React.FC<IProps> = ({ room, renderButtons }) => {
  const renderFacilities = ({
    facilities,
    facilitiesObj,
  }: {
    facilities: string[];
    facilitiesObj: IFacility[];
  }): JSX.Element[] => {
    return facilities.map((singleFacility) => {
      const facilityInfo = facilitiesObj.find(
        (facility) => facility.label === singleFacility
      );

      if (!facilityInfo) return <DoubleBed />;

      return (
        <div className='info-room-facilities-container-individuals'>
          <FlexContainer className='initial-mod'>
            <facilityInfo.component width={22} height={22} />
            <p>{singleFacility}</p>
          </FlexContainer>
        </div>
      );
    });
  };

  return (
    <Container>
      <MainCard borderRadius='16px 0 0 16px' className='side-container info'>
        <div className='info-name'>
          <FlexContainer className='info-name-id'>
            <h1>
              {room.roomName.toUpperCase()}{' '}
              <span style={{ fontSize: '22px' }}>details</span>
            </h1>
            <p id='room-number'>ID: {room.roomNumber}</p>
          </FlexContainer>
          <FlexContainer className='info-name-type'>
            <div className='info-data-block'>
              <p>Room type</p>
              <p>{room.roomType}</p>
            </div>
            <div className='info-data-block'>
              <p>Bed type</p>
              <p>{room.bedType}</p>
            </div>
          </FlexContainer>
        </div>
        <hr />
        <div className='info-room'>
          <FlexContainer className='info-room-details'>
            <div className='info-room-details-offer'>
              <div className='info-data-block'>
                <p>Offer price</p>
                {room.offerPrice && room.offerPrice > 0 ? (
                  <p id='price-offer'>
                    ${room.offerPrice} <span id='price-modifier'>/night</span>
                  </p>
                ) : (
                  <p>No offer available</p>
                )}
              </div>
            </div>
            <div className='info-room-details-price'>
              <div className='info-data-block'>
                <p>Price</p>
                {room.offerPrice && room.offerPrice > 0 ? (
                  <>
                    <p
                      style={{
                        display: 'inline-block',
                        color: '#cf0303',
                        fontSize: '30px',
                        textDecoration: 'line-through',
                      }}
                      id='official-price'
                    >
                      ${room.ratePerNight}{' '}
                    </p>
                    <span id='price-modifier'>/night</span>
                  </>
                ) : (
                  <p id='official-price'>
                    ${room.ratePerNight} <span id='price-modifier'>/night</span>
                  </p>
                )}
              </div>
            </div>
          </FlexContainer>
          <div className='info-room-description'>
            <p id='room-description'>{room.roomDescription}</p>
          </div>
          <div className='info-data-block info-room-facilities'>
            <p>Facilities</p>
            <div className='info-room-facilities-container'>
              {renderFacilities({
                facilities: room.facilities,
                facilitiesObj: facilitiesArray,
              }).map((facility, i) => (
                <div key={i}>{facility}</div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className='info-data-block'>
          <p>Actions</p>
          {renderButtons()}
        </div>
      </MainCard>
      <div className='side-container'>
        <ImgHolder
          style={{ borderRadius: '0 16px 16px 0' }}
          height='100%'
          width='auto'
        >
          <img src={room.photo} alt={room.roomName} />
        </ImgHolder>
      </div>
    </Container>
  );
};
