import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import {
  fetchSingleBooking,
  deleteBooking,
  IBookingObj,
} from '../store/bookingSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import styled from 'styled-components';
import bookingsData from '../assets/data/bookings.json';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const BookingDetails = () => {
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const statusAPI = useAppSelector((state) => state.bookings.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const filteredBooking: IBookingObj[] = bookingsData.filter(
      (booking) => booking.id === +id!
    );
    if (filteredBooking.length === 0) return;
    dispatch(fetchSingleBooking(filteredBooking));
  }, [dispatch, id]);

  const deleteBookingHandler = () => {
    if (
      window.confirm('Are you sure you want to delete this booking?') === false
    )
      return;

    dispatch(deleteBooking({ bookingsList: bookingsData, id: +id! }));
    navigate('/bookings/', { replace: true });
  };

  console.log('bookingRedux', bookingRedux);

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading booking...
      </h1>
    );

  if (bookingRedux.length === 0)
    return (
      <h1>
        We couldn't find the booking selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Booking details for {id}</h1>
      <ul>
        <li>Booked by: {bookingRedux[0].user.name}</li>
        <li>Booking number: #{bookingRedux[0].bookingNumber}</li>
        <li>Room type: {bookingRedux[0].roomType}</li>
        <li>Order date: {bookingRedux[0].orderDate}</li>
        <li>
          Check-in: {bookingRedux[0].checkIn.date},{' '}
          {bookingRedux[0].checkIn.hour}
        </li>
        <li>Check-out: {bookingRedux[0].checkOut.date}</li>
        <li>
          Special request:{' '}
          {bookingRedux[0].specialRequest
            ? bookingRedux[0].specialRequest
            : 'There is not a special request for this booking.'}
        </li>
        <li>Status: {bookingRedux[0].status}</li>
      </ul>
      <div style={{ marginTop: '50px' }}>
        <ButtonGreen
          padding='10px 52px'
          onClick={() => navigate(`/bookings/${id}/edit`)}
        >
          Edit booking
        </ButtonGreen>
        <RedButton padding='10px 52px' onClick={deleteBookingHandler}>
          Delete booking
        </RedButton>
      </div>
    </MainCard>
  );
};

export default BookingDetails;
