import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MainCard } from '../components/Styles';
import { PulseSpinner } from '../components';
import { RoomForm } from '../components/Forms';
import { updateRoom, fetchSingleRoom } from '../store/roomSlice';
import { IRoomData } from '../interfaces';

const roomDataSkeleton = {
  photo: '',
  roomName: '',
  roomNumber: 0,
  roomType: '',
  roomFloor: '',
  bedType: '',
  roomDiscount: 0,
  ratePerNight: 0,
  roomDescription: '',
  facilities: [],
  status: '',
  checkOffer: false,
};

const RoomEdit = () => {
  const [roomData, setRoomData] = useState<IRoomData>(roomDataSkeleton);
  const roomsListRedux = useAppSelector((state) => state.rooms.roomList);
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

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedRoom = Array.isArray(roomsListRedux)
      ? roomsListRedux[0]
      : roomsListRedux;

    const newState = {
      photo: parsedRoom.photo,
      roomName: parsedRoom.roomName,
      roomNumber: parsedRoom.roomNumber,
      roomType: parsedRoom.roomType,
      roomFloor: parsedRoom.roomFloor,
      bedType: parsedRoom.bedType,
      roomDiscount: parsedRoom.offerPrice || 0,
      ratePerNight: parsedRoom.ratePerNight,
      roomDescription: parsedRoom?.roomDescription,
      facilities:
        parsedRoom.facilities?.length > 0 ? parsedRoom.facilities : [],
      status: parsedRoom.status,
      checkOffer: parsedRoom?.offerPrice ? true : false,
    };
    setRoomData(newState);
  }, [roomsListRedux, fetchStatusAPI]);

  const stateInputsHandler = ({
    roomProp,
    newValue,
  }: {
    roomProp: keyof IRoomData;
    newValue: IRoomData[keyof IRoomData];
  }) => {
    setRoomData((prevState) => {
      const newState: IRoomData = { ...prevState };
      newState[roomProp] = newValue;
      return newState;
    });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToUpdate = {
      // images: roomData.photo,
      roomName: roomData.roomName,
      bedType: roomData.bedType,
      roomNumber: roomData.roomNumber,
      roomFloor: roomData.roomFloor,
      roomDescription: roomData.roomDescription,
      roomType: roomData.roomType,
      ratePerNight: roomData.ratePerNight,
      discount: roomData.checkOffer ? roomData.roomDiscount : 0,
      facilities: roomData.facilities,
    };

    if (
      !roomData.roomName.trim() ||
      !roomData.roomNumber ||
      !roomData.roomFloor.trim() ||
      !roomData.ratePerNight ||
      roomData.facilities.length === 0
      // imagesUploadArray.length < 3
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    const result = await dispatch(updateRoom({ id, objToUpdate }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Room edited successfully');
    navigate(`/rooms/${id}`, { replace: true });
  };

  const facilitiesHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoomData((prevState) => {
      const newState = { ...prevState };
      newState.facilities = value;
      return newState;
    });
  };

  if (fetchStatusAPI === 'failed') {
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Problem fetching the room. Check the ID!
      </h1>
    );
  }

  if (fetchStatusAPI === 'loading' || statusAPI === 'loading') {
    return (
      <MainCard borderRadius='16px'>
        <PulseSpinner isLoading={true} />
      </MainCard>
    );
  }

  return (
    <MainCard borderRadius='16px'>
      <h1>Editing room {roomData.roomName}</h1>
      <RoomForm
        stateInputsHandler={stateInputsHandler}
        submitHandler={submitHandler}
        facilitiesHandler={facilitiesHandler}
        roomData={roomData}
        roomsList={roomsListRedux}
      />
    </MainCard>
  );
};

export default RoomEdit;
