import { useParams } from 'react-router-dom';

const BookingDetails = () => {
  const params = useParams();
  const { id } = params;

  return <h1>Booking details for the id: {id}</h1>;
};

export default BookingDetails;
