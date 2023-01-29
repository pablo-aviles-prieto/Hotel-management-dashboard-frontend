import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleBooking, deleteBooking } from '../store/bookingSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import { PulseSpinner } from '../components';
import styled from 'styled-components';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const BookingDetails = () => {
  const bookingRedux = useAppSelector((state) => state.bookings.bookingsList);
  const fetchStatusAPI = useAppSelector((state) => state.bookings.fetchStatus);
  const statusAPI = useAppSelector((state) => state.bookings.status);
  const errorMessageAPI = useAppSelector((state) => state.bookings.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBooking({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      errorMessageAPI &&
      (fetchStatusAPI === 'failed' || statusAPI === 'failed')
    ) {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, fetchStatusAPI, statusAPI]);

  const deleteBookingHandler = async () => {
    if (
      window.confirm('Are you sure you want to delete this booking?') === false
    ) {
      return;
    }

    const result = await dispatch(deleteBooking({ id }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Booking deleted successfully');
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
      {fetchStatusAPI === 'loading' || statusAPI === 'loading' ? (
        <PulseSpinner isLoading={true} />
      ) : (
        <>
          <h1>Booking details for {id}</h1>
          <ul>
            <li>Booked by: {parsedBookings.userName}</li>
            <li>Booking number: #{parsedBookings.bookingNumber}</li>
            <li>
              Room type:{' '}
              {typeof parsedBookings.roomId === 'object'
                ? parsedBookings.roomId.roomType
                : ''}
            </li>
            <li>
              Room name:{' '}
              {typeof parsedBookings.roomId === 'object'
                ? parsedBookings.roomId.roomName
                : ''}
            </li>
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
