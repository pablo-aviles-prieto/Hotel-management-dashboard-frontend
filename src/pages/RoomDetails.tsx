import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleRoom, deleteRoom } from '../store/roomSlice';
import { AuthContext } from '../store/authContext';
import styled from 'styled-components';
import { MainCard, ButtonGreen } from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const RoomDetails = () => {
  const roomRedux = useAppSelector((state) => state.rooms.roomList);
  const fetchStatusAPI = useAppSelector((state) => state.rooms.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  // console.log('statusAPI', statusAPI);

  useEffect(() => {
    dispatch(
      fetchSingleRoom({
        url: new URL(`http://localhost:3200/rooms/${id}`),
        fetchObjProps: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );
  }, [dispatch, id]);

  const deleteRoomHandler = async () => {
    if (window.confirm('Are you sure you want to delete this room?') === false)
      return;

    const result = await dispatch(
      deleteRoom({
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
    navigate('/rooms/', { replace: true });
  };

  const dataChecked = useMemo(
    () => (Array.isArray(roomRedux) ? roomRedux[0] : roomRedux),
    [roomRedux]
  );

  if (fetchStatusAPI === 'failed')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        We couldn't find the room selected. Please check the ID and if it's
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
          <h1>Room details for {id}</h1>
          <ul>
            <li>Bed type: {dataChecked.bedType}</li>
            <li>Room number: {dataChecked.roomNumber}</li>
            <li>Room name: {dataChecked.roomName}</li>
            <li>Room floor: {dataChecked.roomFloor}</li>
            <li>Rate: {dataChecked.ratePerNight}$/Night</li>
            <li>
              Offer price:{' '}
              {dataChecked.offerPrice
                ? dataChecked.offerPrice
                : 'There is no offer for this room'}
            </li>
            <li>Facilities: {dataChecked.facilities}</li>
            <li>Status: {dataChecked.status}</li>
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
        </>
      )}
    </MainCard>
  );
};

export default RoomDetails;
