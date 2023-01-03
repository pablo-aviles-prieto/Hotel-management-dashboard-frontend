import React, { useState, useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../store/typedHooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MainCard,
  InputSelect,
  InputText,
  ButtonGreen,
} from '../components/Styles';
import { updateRoom, fetchSingleRoom } from '../store/roomSlice';
import styled from 'styled-components';
import { AuthContext } from '../store/authContext';

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.darkGreyToLightGrey};
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

const roomAmenitiesOptionsSelect = [
  {
    label: 'Double Bed',
  },
  {
    label: 'LED TV',
  },
  {
    label: 'Coffee Set',
  },
  {
    label: 'Air Conditioner',
  },
  {
    label: 'Free WiFi',
  },
  {
    label: '2 Bathrooms',
  },
];

const API_URI = process.env.REACT_APP_API_URI;

const RoomEdit = () => {
  const [roomNameInput, setRoomNameInput] = useState('');
  const [roomBedTypeSelect, setRoomBedTypeSelect] = useState('Single Bed');
  const [roomNumberInput, setRoomNumberInput] = useState<number | undefined >(undefined);
  const [roomFloorInput, setRoomFloorInput] = useState('');
  const [roomDescription, setRoomDescription] = useState<string | undefined>(
    ''
  );
  const [roomType, setRoomType] = useState('');
  const [checkOffer, setCheckOffer] = useState(false);
  const [roomPriceInput, setRoomPriceInput] = useState(0);
  const [roomDiscountInput, setRoomDiscountInput] = useState(0);
  const [amenitiesSelect, setAmenitiesSelect] = useState<string[]>([]);
  const [imagesInput, setImagesInput] = useState<FileList | FileList[] | null>(
    []
  );
  const roomsListRedux = useAppSelector((state) => state.rooms.roomList);
  const fetchStatusAPI = useAppSelector((state) => state.rooms.fetchStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authStatus } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(
      fetchSingleRoom({
        url: new URL(`${API_URI}/rooms/${id}`),
        fetchObjProps: {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
          },
        },
      })
    );
  }, [dispatch, id, authStatus.token]);

  useEffect(() => {
    if (fetchStatusAPI !== 'idle') return;

    const parsedRoom = Array.isArray(roomsListRedux)
      ? roomsListRedux[0]
      : roomsListRedux;

    setRoomNameInput(parsedRoom.roomName);
    setRoomBedTypeSelect(parsedRoom.bedType);
    setRoomNumberInput(parsedRoom.roomNumber);
    setRoomFloorInput(parsedRoom.roomFloor);
    setRoomType(parsedRoom.roomType);
    setRoomPriceInput(parsedRoom.ratePerNight);
    setRoomDiscountInput(
      parsedRoom?.offerPrice
        ? Number(
            ((parsedRoom?.offerPrice * 100) / parsedRoom.ratePerNight).toFixed(
              2
            )
          )
        : 0
    );
    setCheckOffer(parsedRoom?.offerPrice ? true : false);
    setRoomDescription(parsedRoom?.roomDescription);
    setAmenitiesSelect(
      parsedRoom.facilities?.length > 0 ? parsedRoom.facilities : []
    );
  }, [roomsListRedux, fetchStatusAPI]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const objToUpdate = {
      roomName: roomNameInput,
      bedType: roomBedTypeSelect,
      roomNumber: roomNumberInput,
      roomFloor: roomFloorInput,
      roomDescription,
      roomType,
      ratePerNight: +roomPriceInput,
      discount: checkOffer ? +roomDiscountInput : 0,
      facilities: amenitiesSelect,
      // images: imagesUploadArray,
    };

    if (
      !roomNameInput.trim() ||
      !roomNumberInput ||
      !roomFloorInput.trim() ||
      !roomPriceInput ||
      amenitiesSelect.length === 0
      // imagesUploadArray.length < 3
    ) {
      return alert('Please, fill all the required inputs');
    }
    const result = await dispatch(
      updateRoom({
        url: new URL(`${API_URI}/rooms/${id}`),
        fetchObjProps: {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authStatus.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objToUpdate),
        },
      })
    );

    const hasError = result.meta.requestStatus === 'rejected';
    if (hasError) {
      alert('There was an error editing the room!');
      return;
    }

    navigate(`/rooms/${id}`, { replace: true });
  };

  const amenitiesHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setAmenitiesSelect(value);
  };

  if (fetchStatusAPI === 'loading')
    return (
      <h1 style={{ textAlign: 'center', margin: '100px 0', fontSize: '40px' }}>
        Editing room...
      </h1>
    );

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
            value={roomNameInput}
            id='room-name'
            type='text'
            onChange={(e) => setRoomNameInput(e.target.value)}
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
            onChange={(e) => setImagesInput(e.target.files)}
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
            value={roomBedTypeSelect}
            onChange={(e) => setRoomBedTypeSelect(e.target.value)}
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
            value={roomType}
            id='room-type'
            type='text'
            onChange={(e) => setRoomType(e.target.value)}
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
            value={roomNumberInput}
            id='room-number'
            type='number'
            min='1'
            onChange={(e) => setRoomNumberInput(+e.target.value)}
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
            value={roomFloorInput}
            id='room-floor'
            type='text'
            onChange={(e) => setRoomFloorInput(e.target.value)}
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
            value={roomPriceInput}
            id='room-price'
            type='number'
            min='1'
            step='0.01'
            onChange={(e) => setRoomPriceInput(+e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor='room-discount'>Discount</StyledLabel>
          <InputText
            style={{ minWidth: '175px' }}
            borderRadius='4px'
            padding='5px'
            name='room-discount'
            value={roomDiscountInput}
            id='room-discount'
            type='number'
            min='0'
            max='100'
            step='0.01'
            onChange={(e) => setRoomDiscountInput(+e.target.value)}
          />
        </div>
        <CheckBoxContainer>
          <input
            id='room-offer'
            type='checkbox'
            checked={checkOffer}
            onChange={() => setCheckOffer((prevState) => !prevState)}
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
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
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
            onChange={amenitiesHandler}
            multiple
            value={amenitiesSelect}
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
            {amenitiesSelect.length === 0
              ? !Array.isArray(roomsListRedux)
                ? roomsListRedux.facilities.join(', ')
                : roomsListRedux[0].facilities.join(', ')
              : amenitiesSelect.join(', ')}
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
