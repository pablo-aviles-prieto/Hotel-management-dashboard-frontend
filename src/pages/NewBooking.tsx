import { useState, useContext, useEffect } from 'react';
import {
  InputText,
  ButtonGreen,
  InputSelect,
  MainCard,
  InputDate,
  StyledForm,
  StyledLabel,
  TextArea,
} from '../components/Styles';
import { BookingForm } from '../components/Forms';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBooking } from '../store/bookingSlice';
import { AuthContext } from '../store/authContext';
import { PulseSpinner } from '../components';
import { IRoomObj, IBookingData } from '../interfaces';

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

const NewBooking = () => {
  const [bookingData, setBookingData] =
    useState<IBookingData>(bookingDataSkeleton);
  // const [bookingStatusSelect, setBookingStatusSelect] = useState('check in');
  const [bookedRoom, setBookedRoom] = useState('');
  const [roomsArray, setRoomsArray] = useState<IRoomObj[]>([]);
  const statusAPI = useAppSelector((state) => state.bookings.status);
  const errorMessageAPI = useAppSelector((state) => state.bookings.error);
  const { authStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      .then((res) => {
        setRoomsArray(res.result);
        setBookedRoom(res.result[0].id);
      })
      .catch((err) => console.error('error fetching rooms', err));
  }, [authStatus.token]);

  useEffect(() => {
    if (errorMessageAPI && statusAPI === 'failed') {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, statusAPI]);

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

    const objToSave = {
      bookingNumber: bookingData.bookingNumber,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      specialRequest: bookingData.specialRequest,
      status: bookingData.status,
      userName: bookingData.userName,
      roomId: bookedRoom,
    };

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

    const result = await dispatch(createBooking({ objToSave }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Booking created successfully');
    navigate('/bookings', { replace: true });
  };

  if (statusAPI === 'loading') return <PulseSpinner isLoading={true} />;

  return (
    <MainCard borderRadius='16px'>
      <h1>Create new booking</h1>
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

export default NewBooking;
