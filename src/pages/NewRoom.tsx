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

    // const imagesUploadArray = [];
    // if (imagesInput) {
    //   for (let i = 0; i < imagesInput.length; i++) {
    //     imagesUploadArray.push(imagesInput[i]);
    //   }
    // }
    const objToSave = {
      // images: imagesUploadArray,
      images:
        'https://pablo-aviles-prieto.github.io/hotel-management-app/assets/hotel-rooms/room1.jpg',
      roomName: roomData.roomName,
      bedType: roomData.bedType,
      roomNumber: roomData.roomNumber,
      roomFloor: roomData.roomFloor,
      roomDescription: roomData.roomDescription,
      roomType: roomData.roomType,
      ratePerNight: roomData.ratePerNight,
      discount: roomData.checkOffer ? roomData.roomDiscount : 0,
      facilities: roomData.facilities,
      status: 'Available',
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

    const result = await dispatch(createRoom({ objToSave }));

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

  if (statusAPI === 'loading') return <PulseSpinner isLoading={true} />;

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
