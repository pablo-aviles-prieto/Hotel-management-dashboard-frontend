import React, { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBooking, fetchSingleBooking } from '../store/bookingSlice';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
} from '../components/Styles';
import { AuthContext } from '../store/authContext';
import styled from 'styled-components';
import { IRoomObj } from '../store/roomSlice';

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.darkGreyToLightGrey};
`;

const DateInput = styled(InputText)`
  min-width: 175px;
  color-scheme: ${({ theme }) => theme.calendarColor};
  &::-webkit-calendar-picker-indicator {
    opacity: 1;
    display: block;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    border-width: thin;
    filter: ${({ theme }) => theme.calendarPicker};
  }
`;

const DescriptionTextArea = styled.textarea`
  padding: 5px;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  min-width: 175px;
`;

const bookingStatusOptions = [
  {
    label: 'in progress',
  },
  {
    label: 'check out',
  },
  {
    label: 'check in',
  },
];

const API_URI = process.env.REACT_APP_API_URI;

const BookingEdit = () => {
  const [bookingNumberInput, setBookingNumberInput] = useState(0);
  const [bookingCheckInInput, setBookingCheckInInput] = useState('');
  const [bookingCheckOutInput, setBookingCheckOutInput] = useState('');
  const [bookingSpecialRequestInput, setBookingSpecialRequestInput] =
    useState('');
  const [bookingStatusSelect, setBookingStatusSelect] = useState('');
  const [bookingUserInput, setBookingUserInput] = useState('');
  const [bookedRoom, setBookedRoom] = useState('');
  const [roomsArray, setRoomsArray] = useState<IRoomObj[]>([]);
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const fetchStatusAPI = useAppSelector((state) => state.bookings.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchAllRooms = async () => {
      const response = await fetch(`${API_URI}/rooms`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authStatus.token}`,
        },
      });
      const parsedRooms = await response.json();
      return parsedRooms;
    };

    fetchAllRooms()
      .then((res) => setRoomsArray(res.result))
      .catch((err) => console.error('error fetching rooms', err));

    dispatch(fetchSingleBooking({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedBookings = Array.isArray(bookingRedux)
      ? bookingRedux[0]
      : bookingRedux;
    setBookingNumberInput(parsedBookings.bookingNumber);
    setBookingCheckInInput(parsedBookings.checkIn);
    setBookingCheckOutInput(parsedBookings.checkOut);
    setBookingSpecialRequestInput(
      parsedBookings?.specialRequest ? parsedBookings.specialRequest : ''
    );
    setBookingStatusSelect(parsedBookings.status);
    setBookingUserInput(parsedBookings.userName);
    setBookedRoom(parsedBookings.roomId.id);
  }, [bookingRedux, fetchStatusAPI]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !bookingNumberInput ||
      !bookingCheckInInput ||
      !bookingCheckOutInput ||
      !bookingStatusSelect
    ) {
      return alert('Please, fill all the required inputs');
    }

    const objToUpdate = {
      bookingNumber: bookingNumberInput,
      checkIn: bookingCheckInInput,
      checkOut: bookingCheckOutInput,
      specialRequest: bookingSpecialRequestInput,
      status: bookingStatusSelect,
      userName: bookingUserInput,
      roomId: bookedRoom,
    };

    const result = await dispatch(updateBooking({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('There was an error editing the booking!');
      return;
    }

    navigate(`/bookings/${id}`, { replace: true });
  };

  if (fetchStatusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Editing booking...
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Editing Booking {id}</h1>
      <StyledForm onSubmit={submitHandler}>
        <div>
          <StyledLabel htmlFor='booking-number'>
            Number<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='booking-number'
            placeholder='number...'
            value={bookingNumberInput}
            id='booking-number'
            min={1}
            type='number'
            onChange={(e) => setBookingNumberInput(+e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='booking-checkin'>
            Check in<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <DateInput
            borderRadius='4px'
            padding='5px'
            name='booking-checkin'
            value={bookingCheckInInput}
            id='booking-checkin'
            type='date'
            onChange={(e) => setBookingCheckInInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='booking-checkout'>
            Check out<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <DateInput
            borderRadius='4px'
            padding='5px'
            name='booking-checkout'
            value={bookingCheckOutInput}
            id='booking-checkout'
            type='date'
            onChange={(e) => setBookingCheckOutInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='booking-userName'>
            Booked by user<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='booking-userName'
            placeholder='room type...'
            value={bookingUserInput}
            id='booking-userName'
            type='text'
            onChange={(e) => setBookingUserInput(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='special-request'>Special request</StyledLabel>
          <DescriptionTextArea
            placeholder='Special request...'
            id='special-request'
            rows={5}
            value={bookingSpecialRequestInput}
            onChange={(e) => setBookingSpecialRequestInput(e.target.value)}
          ></DescriptionTextArea>
        </div>
        <div>
          <StyledLabel htmlFor='booking-status'>Status</StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
              minWidth: '175px',
            }}
            id='booking-status'
            padding='8px 5px'
            positionArrowY='0'
            value={bookingStatusSelect}
            onChange={(e) => setBookingStatusSelect(e.target.value)}
          >
            {bookingStatusOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <StyledLabel htmlFor='booking-roomId'>Booked room</StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
              minWidth: '175px',
            }}
            id='booking-roomId'
            padding='8px 5px'
            positionArrowY='0'
            value={bookedRoom}
            onChange={(e) => setBookedRoom(e.target.value)}
          >
            {roomsArray.map((room) => (
              <option key={room.id} value={room.id}>
                ID {room.id}: {room.roomName}
              </option>
            ))}
          </InputSelect>
        </div>
        <div style={{ marginTop: '25px' }}>
          <ButtonGreen padding='10px 52px' type='submit'>
            Save booking
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default BookingEdit;
function listAllEventListeners(): any {
  throw new Error('Function not implemented.');
}
