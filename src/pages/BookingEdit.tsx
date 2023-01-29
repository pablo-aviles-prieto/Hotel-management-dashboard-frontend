import React, { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBooking, fetchSingleBooking } from '../store/bookingSlice';
import { MainCard } from '../components/Styles';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import { BookingForm } from '../components/Forms';
import { AuthContext } from '../store/authContext';
import { IBookingData, IRoomObj } from '../interfaces';

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
      !bookingData.userName.trim() ||
      !bookingData.checkOut ||
      !bookingData.status
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
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
      <BookingForm
        stateInputsHandler={stateInputsHandler}
        submitHandler={submitHandler}
        setBookedRoom={setBookedRoom}
        bookingData={bookingData}
        bookedRoom={bookedRoom}
        roomsArray={roomsArray}
      />
    </MainCard>
  );
};

export default BookingEdit;
