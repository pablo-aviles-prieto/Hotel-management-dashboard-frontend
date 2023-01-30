import styled from 'styled-components';
import {
  MainCard,
  ImgHolder,
  FlexContainer,
  ButtonGreen,
  RedButton,
} from '../Styles';
import { IRoomFetchObj } from '../../interfaces';
import { renderFacilities, facilitiesArray } from '../../utils/facilitiesArray';

type IBooking = {
  bookingNumber: number;
  checkIn: string;
  checkOut: string;
  id: string;
  orderDate: string;
  roomId: IRoomFetchObj;
  specialRequest: string;
  status: string;
  userName: string;
};

interface IProps {
  booking: IBooking;
  deleteHandler: () => Promise<void>;
  editHandler: (id: string) => void;
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
  .booking-title {
    margin-bottom: 12px;
    span {
      font-weight: 400;
      font-size: 18px;
      color: ${({ theme }) => theme.darkGreyToLightGrey};
    }
  }
  .info {
    &-data {
      &-block {
        width: 100%;
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
        .price-modifier {
          color: ${({ theme }) => theme.darkGreyToLightGrey};
          font-size: 10px;
        }
        .price-offer {
          font-size: 30px;
          color: #04a004;
        }
        .official-price {
          font-size: 25px;
        }
      }
    }
    &-room {
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
    &--separator {
      margin-top: 40px;
    }
  }
`;

export const BookingContainer: React.FC<IProps> = ({
  booking,
  deleteHandler,
  editHandler,
}) => {
  return (
    <Container>
      <MainCard borderRadius='16px 0 0 16px' className='side-container info'>
        <div>
          <FlexContainer>
            <h1 className='booking-title'>
              Booking <span>#{booking.bookingNumber}</span>
            </h1>
          </FlexContainer>
          <FlexContainer className='info-data'>
            <div className='info-data-block'>
              <p>Check in</p>
              <p>{booking.checkIn}</p>
            </div>
            <div className='info-data-block'>
              <p>Check out</p>
              <p>{booking.checkOut}</p>
            </div>
          </FlexContainer>
        </div>
        <hr />
        <div>
          <FlexContainer className='info-data'>
            <div className='info-data-block'>
              <p>Booked by</p>
              <p>{booking.userName}</p>
            </div>
            <div className='info-data-block'>
              <p>Special request</p>
              <p>
                {booking.specialRequest
                  ? booking.specialRequest
                  : `There isn't a special request`}
              </p>
            </div>
          </FlexContainer>
        </div>
        <div>
          <FlexContainer className='info-data info--separator'>
            <div className='info-data-block'>
              <p>Room booked:</p>
              <p>{booking.roomId.roomName}</p>
            </div>
            <div className='info-data-block'>
              <p>Room price</p>
              {booking.roomId.offerPrice && booking.roomId.offerPrice > 0 ? (
                <p className='price-offer'>
                  ${booking.roomId.offerPrice}{' '}
                  <span className='price-modifier'>/night</span>
                </p>
              ) : (
                <p className='official-price'>
                  ${booking.roomId.ratePerNight}{' '}
                  <span className='price-modifier'>/night</span>
                </p>
              )}
            </div>
          </FlexContainer>
        </div>
        <div className='info-data-block info-room-facilities info--separator'>
          <p>Facilities</p>
          <div className='info-room-facilities-container'>
            {renderFacilities({
              facilities: booking.roomId.facilities,
              facilitiesObj: facilitiesArray,
            }).map((facility, i) => (
              <div key={i}>{facility}</div>
            ))}
          </div>
        </div>
        <hr />
        <div className='info-data-block'>
          <p>Actions</p>
          <FlexContainer>
            <ButtonGreen
              padding='10px 52px'
              style={{ width: '100%' }}
              onClick={() => editHandler(booking.id)}
            >
              Edit booking
            </ButtonGreen>
            <RedButton
              padding='10px 52px'
              style={{ width: '100%' }}
              onClick={deleteHandler}
            >
              Delete booking
            </RedButton>
          </FlexContainer>
        </div>
      </MainCard>
      <div className='side-container'>
        <ImgHolder
          style={{ borderRadius: '0 16px 16px 0' }}
          height='100%'
          width='auto'
        >
          <img src={booking.roomId.photo} alt={booking.roomId.roomName} />
        </ImgHolder>
      </div>
    </Container>
  );
};
