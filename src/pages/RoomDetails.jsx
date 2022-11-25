import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleRoom, deleteRoom } from '../store/roomSlice';
import roomData from '../assets/data/rooms.json';
import styled from 'styled-components';
import { MainCard, ButtonGreen } from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const RoomDetails = () => {
  const roomRedux = useSelector((state) => state.rooms.roomList);
  const statusAPI = useSelector((state) => state.rooms.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  // console.log('statusAPI', statusAPI);
  // console.log('roomRedux', roomRedux);

  useEffect(() => {
    const filteredRoom = roomData.filter((room) => room.id === +id);
    dispatch(fetchSingleRoom(filteredRoom));
  }, [dispatch, id]);

  const deleteRoomHandler = () => {
    if (window.confirm('Are you sure you want to delete this room?') === false)
      return;

    dispatch(deleteRoom({ roomsList: roomData, id: +id }));
    navigate('/rooms/', { replace: true });
  };

  if (statusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Loading room...
      </h1>
    );

  if (roomRedux.length === 0)
    return (
      <h1>
        We couldn't find the room selected. Please check the ID and if it's
        correct try again later!
      </h1>
    );

  return (
    <MainCard borderRadius='16px'>
      <h1>Room details for {id}</h1>
      <ul>
        <li>Bed type: {roomRedux[0].bedType}</li>
        <li>Room number: {roomRedux[0].roomNumber}</li>
        <li>Room name: {roomRedux[0].roomName}</li>
        <li>Room floor: {roomRedux[0].roomFloor}</li>
        <li>Rate: {roomRedux[0].ratePerNight}$/Night</li>
        <li>
          Offer price:{' '}
          {roomRedux[0].offerPrice
            ? roomRedux[0].offerPrice
            : 'There is no offer for this room'}
        </li>
        <li>Facilities: {roomRedux[0].facilities}</li>
        <li>Status: {roomRedux[0].status}</li>
      </ul>
      <div style={{ marginTop: '50px' }}>
        <ButtonGreen
          padding='10px 52px'
          onClick={() => navigate(`/rooms/${id}/edit`)}
        >
          Edit room
        </ButtonGreen>
        <RedButton padding='10px 52px' onClick={deleteRoomHandler}>
          Delete room
        </RedButton>
      </div>
    </MainCard>
  );
};

export default RoomDetails;
