import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleBooking, deleteBooking } from '../store/bookingSlice';
import { MainCard } from '../components/Styles';
import { PulseSpinner, BookingContainer } from '../components';

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

  const editBookingHandler = (id: string) => {
    navigate(`/bookings/${id}/edit`);
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
    <>
      {fetchStatusAPI === 'loading' || statusAPI === 'loading' ? (
        <MainCard borderRadius='16px'>
          <PulseSpinner isLoading={true} />
        </MainCard>
      ) : (
        <>
          <BookingContainer
            booking={parsedBookings}
            deleteHandler={deleteBookingHandler}
            editHandler={editBookingHandler}
          />
        </>
      )}
    </>
  );
};

export default BookingDetails;
