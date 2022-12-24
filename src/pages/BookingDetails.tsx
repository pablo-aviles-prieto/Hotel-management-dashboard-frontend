import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleBooking, deleteBooking } from '../store/bookingSlice';
import { MainCard, ButtonGreen } from '../components/Styles';
import { AuthContext } from '../store/auth-context';
import styled from 'styled-components';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

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
        url: new URL(`http://localhost:3200/bookings/${id}`),
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
        url: new URL(`http://localhost:3200/bookings/${id}`),
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

  const dataChecked = useMemo(
    () => (Array.isArray(bookingRedux) ? bookingRedux[0] : bookingRedux),
    [bookingRedux]
  );

  if (fetchStatusAPI === 'failed')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        We couldn't find the booking selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

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
            <li>Booked by: {dataChecked.user.name}</li>
            <li>Booking number: #{dataChecked.bookingNumber}</li>
            <li>Room type: {dataChecked.roomType}</li>
            <li>Order date: {dataChecked.orderDate}</li>
            <li>Check-in: {dataChecked.checkIn}</li>
            <li>Check-out: {dataChecked.checkOut}</li>
            <li>
              Special request:{' '}
              {dataChecked.specialRequest
                ? dataChecked.specialRequest
                : 'There is not a special request for this booking.'}
            </li>
            <li>Status: {dataChecked.status}</li>
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
