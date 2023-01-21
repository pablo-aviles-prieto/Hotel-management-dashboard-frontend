import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleRoom, deleteRoom } from '../store/roomSlice';
import styled from 'styled-components';
import { PulseSpinner } from '../components';
import { MainCard, ButtonGreen } from '../components/Styles';

const RedButton = styled(ButtonGreen)`
  background-color: rgb(226, 52, 40);
  margin-left: 10px;
`;

const RoomDetails = () => {
  const roomRedux = useAppSelector((state) => state.rooms.roomList);
  const fetchStatusAPI = useAppSelector((state) => state.rooms.fetchStatus);
  const statusAPI = useAppSelector((state) => state.rooms.status);
  const errorMessageAPI = useAppSelector((state) => state.rooms.error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(fetchSingleRoom({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      errorMessageAPI &&
      (fetchStatusAPI === 'failed' || statusAPI === 'failed')
    ) {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, fetchStatusAPI, statusAPI]);

  const deleteRoomHandler = async () => {
    if (window.confirm('Are you sure you want to delete this room?') === false)
      return;

    const result = await dispatch(deleteRoom({ id }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Room deleted successfully');
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
      {fetchStatusAPI === 'loading' || statusAPI === 'loading' ? (
        <PulseSpinner isLoading={true} />
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
              Discount to apply:{' '}
              {dataChecked.offerPrice
                ? `${dataChecked.offerPrice}%`
                : 'There is no discount for this room'}
            </li>
            <li>Facilities: {dataChecked.facilities.join(', ')}</li>
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