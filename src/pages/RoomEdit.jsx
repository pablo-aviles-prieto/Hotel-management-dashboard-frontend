import { useParams } from 'react-router-dom';

const RoomEdit = () => {
  const params = useParams();
  const { id } = params;

  return <h1>Edit room page for the id: {id}</h1>;
};

export default RoomEdit;
