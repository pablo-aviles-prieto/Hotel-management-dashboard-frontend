import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const params = useParams();
  const { id } = params;

  return <h1>Room details page for the id: {id}</h1>;
};

export default RoomDetails;
