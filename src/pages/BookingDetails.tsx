import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleBooking, deleteBooking } from '../store/bookingSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import { AuthContext } from '../store/authContext';
import styled from 'styled-components';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const API_URI = process.env.REACT_APP_API_URI;

const BookingDetails = () => {
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const fetchStatusAPI = useAppSelector((state) => state.bookings.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(
      fetchSingleBooking({
        url: new URL(`${API_URI}/bookings/${id}`),
        fetchObjProps: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );
  }, [dispatch, id]);

  const deleteBookingHandler = async () => {
    if (
      window.confirm('Are you sure you want to delete this booking?') === false
    ) {
      return;
    }

    const result = await dispatch(
      deleteBooking({
        url: new URL(`${API_URI}/bookings/${id}`),
        fetchObjProps: {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('ID provided is not valid!');
      return;
    }
    navigate('/bookings/', { replace: true });
  };

  const parsedBookings = useMemo(
    () => (Array.isArray(bookingRedux) ? bookingRedux[0] : bookingRedux),
    [bookingRedux]
  );

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        We couldn't find the booking selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      {fetchStatusAPI === 'loading' ? (
        <h1
          style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}
        >
          Loading booking {id}...
        </h1>
      ) : (
        <>
          <h1>Booking details for {id}</h1>
          <ul>
            <li>Booked by: {parsedBookings.userName}</li>
            <li>Booking number: #{parsedBookings.bookingNumber}</li>
            <li>Room type: {parsedBookings.roomType}</li>
            <li>Room name: {parsedBookings.roomName}</li>
            <li>Order date: {parsedBookings.orderDate}</li>
            <li>Check-in: {parsedBookings.checkIn}</li>
            <li>Check-out: {parsedBookings.checkOut}</li>
            <li>
              Special request:{' '}
              {parsedBookings.specialRequest
                ? parsedBookings.specialRequest
                : 'There is not a special request for this booking.'}
            </li>
            <li>Status: {parsedBookings.status}</li>
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
        </>
      )}
    </MainCard>
  );
};

export default BookingDetails;
