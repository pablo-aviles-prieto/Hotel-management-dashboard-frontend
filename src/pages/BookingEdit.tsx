import React, { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBooking, fetchSingleBooking } from '../store/bookingSlice';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
  StyledForm,
  StyledLabel,
  TextArea,
  InputDate,
} from '../components/Styles';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import { AuthContext } from '../store/authContext';
import { IRoomObj } from '../store/roomSlice';
import { IBookingData } from '../interfaces';

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

const bookingDataSkeleton = {
  bookingNumber: 0,
  userName: '',
  checkIn: '',
  checkOut: '',
  specialRequest: '',
  status: '',
};

const BookingEdit = () => {
  const [bookingData, setBookingData] =
    useState<IBookingData>(bookingDataSkeleton);
  const [bookedRoom, setBookedRoom] = useState('');
  const [roomsArray, setRoomsArray] = useState<IRoomObj[]>([]);
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const fetchStatusAPI = useAppSelector((state) => state.bookings.fetchStatus);
  const statusAPI = useAppSelector((state) => state.bookings.status);
  const errorMessageAPI = useAppSelector((state) => state.bookings.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const { id } = useParams();

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
      .catch((err) => {
        console.error('error fetching the rooms available', err);
        toast.error(
          'Error fetching the rooms available for bookings. Returning back!'
        );
        navigate(`/bookings/${id}`, { replace: true });
      });

    dispatch(fetchSingleBooking({ id }));
  }, [dispatch, id, authStatus.token]);

  useEffect(() => {
    if (
      errorMessageAPI &&
      (fetchStatusAPI === 'failed' || statusAPI === 'failed')
    ) {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, fetchStatusAPI, statusAPI]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedBookings = Array.isArray(bookingRedux)
      ? bookingRedux[0]
      : bookingRedux;

    const newState = {
      bookingNumber: parsedBookings.bookingNumber,
      userName: parsedBookings.userName,
      checkIn: parsedBookings.checkIn,
      checkOut: parsedBookings.checkOut,
      specialRequest: parsedBookings?.specialRequest
        ? parsedBookings.specialRequest
        : '',
      status: parsedBookings.status,
    };
    setBookingData(newState);
    setBookedRoom(parsedBookings.roomId.id);
  }, [bookingRedux, fetchStatusAPI]);

  const stateInputsHandler = ({
    bookingProp,
    newValue,
  }: {
    bookingProp: keyof IBookingData;
    newValue: IBookingData[keyof IBookingData];
  }) => {
    setBookingData((prevState) => {
      const newState: IBookingData = { ...prevState };
      newState[bookingProp] = newValue;
      return newState;
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !bookingData.bookingNumber ||
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.status
    ) {
      return toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
    }

    const objToUpdate = {
      bookingNumber: bookingData.bookingNumber,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      specialRequest: bookingData.specialRequest,
      status: bookingData.status,
      userName: bookingData.userName,
      roomId: bookedRoom,
    };

    const result = await dispatch(updateBooking({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Booking edited successfully');
    navigate(`/bookings/${id}`, { replace: true });
  };

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Problem fetching the booking. Check the ID!
      </h1>
    );
  }

  if (fetchStatusAPI === 'loading' || statusAPI === 'loading') {
    return (
      <MainCard borderRadius='16px'>
        <PulseSpinner isLoading={true} />
      </MainCard>
    );
  }

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
            value={bookingData.bookingNumber}
            id='booking-number'
            min={1}
            type='number'
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'bookingNumber',
                newValue: +e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='booking-checkin'>
            Check in<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputDate
            borderRadius='4px'
            padding='5px'
            name='booking-checkin'
            value={bookingData.checkIn}
            id='booking-checkin'
            type='date'
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'checkIn',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='booking-checkout'>
            Check out<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputDate
            borderRadius='4px'
            padding='5px'
            name='booking-checkout'
            value={bookingData.checkOut}
            id='booking-checkout'
            type='date'
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'checkOut',
                newValue: e.target.value,
              })
            }
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
            placeholder='booked by...'
            value={bookingData.userName}
            id='booking-userName'
            type='text'
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'userName',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='special-request'>Special request</StyledLabel>
          <TextArea
            placeholder='Special request...'
            id='special-request'
            rows={5}
            value={bookingData.specialRequest}
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'specialRequest',
                newValue: e.target.value,
              })
            }
          ></TextArea>
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
            value={bookingData.status}
            onChange={(e) =>
              stateInputsHandler({
                bookingProp: 'status',
                newValue: e.target.value,
              })
            }
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
