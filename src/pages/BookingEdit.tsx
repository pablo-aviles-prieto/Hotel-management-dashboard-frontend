import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBooking } from '../store/bookingSlice';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
} from '../components/Styles';
import styled from 'styled-components';
import bookingsData from '../assets/data/bookings.json';

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

const BookingEdit = () => {
  const [bookingNumberInput, setBookingNumberInput] = useState(0);
  const [bookingCheckInInput, setBookingCheckInInput] = useState('');
  const [bookingCheckOutInput, setBookingCheckOutInput] = useState('');
  const [bookingRoomTypeInput, setBookingRoomTypeInput] = useState('');
  const [bookingSpecialRequestInput, setBookingSpecialRequestInput] =
    useState('');
  const [bookingStatusSelect, setBookingStatusSelect] = useState('');
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const statusAPI = useAppSelector((state) => state.bookings.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    setBookingNumberInput(bookingRedux[0].bookingNumber);
    // setBookingCheckInInput('2022-11-25');
    // setBookingCheckOutInput(bookingRedux[0].checkOut);
    setBookingRoomTypeInput(bookingRedux[0].roomType);
    setBookingSpecialRequestInput(
      bookingRedux[0]?.specialRequest ? bookingRedux[0]?.specialRequest : ''
    );
    setBookingStatusSelect(bookingRedux[0].status);
  }, [bookingRedux]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const objToUpdate = {
      id: +id!,
      bookingNumber: bookingNumberInput,
      checkIn: bookingCheckInInput,
      checkOut: bookingCheckOutInput,
      roomType: bookingRoomTypeInput,
      specialRequest: bookingSpecialRequestInput,
      status: bookingStatusSelect,
    };

    if (
      !bookingNumberInput ||
      !bookingCheckInInput ||
      !bookingCheckOutInput ||
      !bookingRoomTypeInput.trim() ||
      !bookingStatusSelect
    ) {
      return alert('Please, fill all the required inputs');
    }
    console.log('objToUpdate', objToUpdate);

    dispatch(updateBooking({ bookingsList: bookingsData, objToUpdate }));
    navigate(`/bookings/${id}`, { replace: true });
  };

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading booking...
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
          <StyledLabel htmlFor='booking-room-type'>
            Room type<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='booking-room-type'
            placeholder='room type...'
            value={bookingRoomTypeInput}
            id='booking-room-type'
            type='text'
            onChange={(e) => setBookingRoomTypeInput(e.target.value)}
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
