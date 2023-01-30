import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { fetchSingleRoom, deleteRoom } from '../store/roomSlice';
import styled from 'styled-components';
import { PulseSpinner, RoomContainer } from '../components';
import { MainCard, ButtonGreen, FlexContainer } from '../components/Styles';

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
  const { id } = useParams();

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

  const renderButtons = () => {
    return (
      <FlexContainer>
        <ButtonGreen
          padding='10px 52px'
          style={{ width: '100%' }}
          onClick={() => navigate(`/rooms/${id}/edit`)}
        >
          Edit room
        </ButtonGreen>
        <RedButton
          padding='10px 52px'
          style={{ width: '100%' }}
          onClick={deleteRoomHandler}
        >
          Delete room
        </RedButton>
      </FlexContainer>
    );
  };

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        We couldn't find the room selected. Please check the ID and if it's
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
        <RoomContainer
          room={dataChecked}
          renderButtons={renderButtons}
        />
      )}
    </>
  );
};

export default RoomDetails;
