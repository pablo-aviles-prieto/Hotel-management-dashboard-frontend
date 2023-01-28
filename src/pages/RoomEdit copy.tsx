import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
  StyledLabel,
} from '../components/Styles';
import { toast } from 'react-toastify';
import { PulseSpinner } from '../components';
import { updateRoom, fetchSingleRoom } from '../store/roomSlice';
import { facilitiesArray } from '../utils';
import { IRoomData } from '../interfaces';
import styled from 'styled-components';

const roomAmenitiesOptionsSelect = facilitiesArray;

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

const DescriptionTextArea = styled.textarea`
  padding: 5px;
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.buttonGreenBground};
  min-width: 175px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  input {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #135846;
    outline: none;
    cursor: pointer;
    &:checked {
      background-color: #135846;
      position: relative;
      &::before {
        font-size: 19px;
        color: #fff;
        content: '✔';
        position: absolute;
        right: 1px;
        top: -5px;
      }
    }
  }
`;

const roomTypeOptionsSelect = [
  {
    label: 'Single Bed',
  },
  {
    label: 'Double Bed',
  },
  {
    label: 'Double Superior',
  },
  {
    label: 'Suite',
  },
];

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
      roomDiscount: parsedRoom?.offerPrice
        ? Number(
            ((parsedRoom?.offerPrice * 100) / parsedRoom.ratePerNight).toFixed(
              2
            )
          )
        : 0,
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
      roomName: roomData.roomName,
      bedType: roomData.bedType,
      roomNumber: roomData.roomNumber,
      roomFloor: roomData.roomFloor,
      roomDescription: roomData.roomDescription,
      roomType: roomData.roomType,
      ratePerNight: roomData.ratePerNight,
      discount: roomData.checkOffer ? roomData.roomDiscount : 0,
      facilities: roomData.facilities,
      // images: roomData.photo,
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
      <h1>Editing room {id}</h1>
      <StyledForm onSubmit={submitHandler}>
        <div>
          <StyledLabel htmlFor='room-name'>
            Name<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='room-name'
            placeholder='name...'
            value={roomData.roomName}
            id='room-name'
            type='text'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomName',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-images'>
            Upload images<span style={{ color: 'red' }}>*</span>{' '}
            <span style={{ fontSize: '12px' }}>
              (Hold down the Ctrl (windows) or Command (Mac) button to select
              multiple images to upload)
            </span>
          </StyledLabel>
          <input
            type='file'
            id='room-images'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'photo',
                newValue: e.target.files,
              })
            }
            multiple={true}
            accept='image/jpg,image/png'
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-type'>
            Bed Type<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            id='room-type'
            padding='8px 5px'
            positionArrowY='0'
            value={roomData.bedType}
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'bedType',
                newValue: e.target.value,
              })
            }
          >
            {roomTypeOptionsSelect.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <StyledLabel htmlFor='room-type'>
            Room Type<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='room-type'
            placeholder='room type...'
            value={roomData.roomType}
            id='room-type'
            type='text'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomType',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-number'>
            Number<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='room-number'
            placeholder='number...'
            value={roomData.roomNumber}
            id='room-number'
            type='number'
            min='1'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomNumber',
                newValue: +e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-floor'>
            Floor<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='room-floor'
            placeholder='floor...'
            value={roomData.roomFloor}
            id='room-floor'
            type='text'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomFloor',
                newValue: e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-price'>
            Price<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputText
            borderRadius='4px'
            padding='5px'
            name='room-price'
            placeholder='price...'
            value={roomData.ratePerNight}
            id='room-price'
            type='number'
            min='1'
            step='0.01'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'ratePerNight',
                newValue: +e.target.value,
              })
            }
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-discount'>Discount</StyledLabel>
          <InputText
            style={{ minWidth: '175px' }}
            borderRadius='4px'
            padding='5px'
            name='room-discount'
            value={roomData.roomDiscount}
            id='room-discount'
            type='number'
            min='0'
            step='0.01'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomDiscount',
                newValue: +e.target.value,
              })
            }
          />
        </div>
        <CheckBoxContainer>
          <input
            id='room-offer'
            type='checkbox'
            checked={roomData.checkOffer}
            onChange={() => {
              const newOfferValue = !roomData.checkOffer;
              stateInputsHandler({
                roomProp: 'checkOffer',
                newValue: newOfferValue,
              });
            }}
          />
          <StyledLabel htmlFor='room-offer'>
            Offer{' '}
            <span style={{ fontSize: '12px' }}>
              (need to check it in order to add a discount)
            </span>
          </StyledLabel>
        </CheckBoxContainer>
        <div>
          <StyledLabel htmlFor='room-description'>Description</StyledLabel>
          <DescriptionTextArea
            placeholder='Enter description...'
            id='room-description'
            rows={5}
            value={roomData.roomDescription}
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomDescription',
                newValue: e.target.value,
              })
            }
          ></DescriptionTextArea>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <StyledLabel htmlFor='room-amenities'>
            Amenities<span style={{ color: 'red' }}>*</span>{' '}
            <span style={{ fontSize: '12px' }}>
              (Hold down the Ctrl (windows) or Command (Mac) button to select
              multiple options)
            </span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
              backgroundImage: 'none',
              width: '175px',
              minHeight: '140px',
            }}
            id='room-amenities'
            padding='9px 5px'
            positionArrowY='0'
            onChange={facilitiesHandler}
            multiple
            value={roomData.facilities}
          >
            {roomAmenitiesOptionsSelect.map((option) => (
              <option
                style={{ background: 'transparent' }}
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            ))}
          </InputSelect>
          <p>
            <b>Selecteds</b>:{' '}
            {roomData.facilities.length === 0
              ? !Array.isArray(roomsListRedux)
                ? roomsListRedux.facilities.join(', ')
                : roomsListRedux[0].facilities.join(', ')
              : roomData.facilities.join(', ')}
          </p>
        </div>
        <div>
          <ButtonGreen padding='10px 52px' type='submit'>
            Save room
          </ButtonGreen>
        </div>
      </StyledForm>
    </MainCard>
  );
};

export default RoomEdit;
