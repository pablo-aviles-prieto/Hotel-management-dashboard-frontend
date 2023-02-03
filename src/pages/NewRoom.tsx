import { MainCard } from '../components/Styles';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../store/roomSlice';
import { PulseSpinner } from '../components';
import { IRoomData } from '../interfaces';
import { RoomForm } from '../components/Forms';

const roomDataSkeleton = {
  photo: new File([], ''),
  roomName: '',
  roomNumber: 0,
  roomType: '',
  roomFloor: '',
  bedType: 'Single bed',
  roomDiscount: 0,
  ratePerNight: 0,
  roomDescription: '',
  facilities: [],
  status: 'Available',
  checkOffer: false,
};

const NewRoom = () => {
  const [roomData, setRoomData] = useState<IRoomData>(roomDataSkeleton);
  const statusAPI = useAppSelector((state) => state.rooms.status);
  const errorMessageAPI = useAppSelector((state) => state.rooms.error);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errorMessageAPI && statusAPI === 'failed') {
      toast.error(errorMessageAPI);
    }
  }, [errorMessageAPI, statusAPI]);

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

    if (
      !roomData.roomName.trim() ||
      !roomData.roomNumber ||
      !roomData.roomFloor.trim() ||
      !roomData.ratePerNight ||
      roomData.facilities.length === 0
    ) {
      toast.warn('Fill all the required inputs', {
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const discountPrice = roomData.checkOffer ? roomData.roomDiscount : 0;

    const formData = new FormData();
    formData.append('images', roomData.photo as File);
    formData.append('roomName', roomData.roomName);
    formData.append('bedType', roomData.bedType);
    formData.append('roomNumber', roomData.roomNumber.toString());
    formData.append('roomFloor', roomData.roomFloor);
    formData.append('roomDescription', roomData.roomDescription || '');
    formData.append('roomType', roomData.roomType);
    formData.append('ratePerNight', roomData.ratePerNight.toString());
    formData.append('discount', discountPrice.toString());
    formData.append('facilities', JSON.stringify(roomData.facilities));
    formData.append('status', roomData.status);

    const result = await dispatch(createRoom({ objToSave: formData }));

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) return;

    toast.success('Room created successfully');
    navigate('/rooms', { replace: true });
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

  if (statusAPI === 'loading') return <PulseSpinner isLoading />;

  return (
    <MainCard borderRadius='16px'>
      <h1>Create new room</h1>
      <RoomForm
        stateInputsHandler={stateInputsHandler}
        submitHandler={submitHandler}
        facilitiesHandler={facilitiesHandler}
        roomData={roomData}
      />
    </MainCard>
  );
};

export default NewRoom;
