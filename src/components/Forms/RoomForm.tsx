import { useState, useEffect, useRef, useMemo } from 'react';
import {
  StyledLabel,
  InputText,
  InputSelect,
  CheckBoxContainer,
  TextArea,
  ButtonGreen,
  StyledForm,
  FlexContainer,
  InputContainer,
  InputFileContainer,
  ImgHolder,
} from '../Styles';
import { IRoomData, IRoomObj } from '../../interfaces';
import { facilitiesArray as roomAmenitiesOptionsSelect } from '../../utils';

type IStateInputsHandlerPops = {
  roomProp: keyof IRoomData;
  newValue: IRoomData[keyof IRoomData];
};

interface IProps {
  stateInputsHandler: ({ roomProp, newValue }: IStateInputsHandlerPops) => void;
  submitHandler: (e: React.FormEvent) => Promise<void>;
  facilitiesHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  roomData: IRoomData;
  roomsList?: IRoomObj;
}

const roomTypeOptionsSelect = [
  {
    label: 'Single bed',
  },
  {
    label: 'Double bed',
  },
  {
    label: 'Double superior',
  },
  {
    label: 'Suite',
  },
];

export const RoomForm: React.FC<IProps> = ({
  stateInputsHandler,
  submitHandler,
  facilitiesHandler,
  roomData,
  roomsList = undefined,
}) => {
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    ''
  );
  const readerRef = useRef(new FileReader());

  useEffect(() => {
    const reader = readerRef.current;
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    return () => {
      reader.removeEventListener('onload', () => {
        setImagePreview(reader.result);
      });
    };
  }, []);

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      stateInputsHandler({
        roomProp: 'photo',
        newValue: e.target.files![0],
      });
      readerRef.current.readAsDataURL(e.target.files![0]);
    }
  };

  const imageDisplay = useMemo(
    () => (imagePreview ? (imagePreview as string) : roomsList?.photo),
    [imagePreview, roomsList]
  );

  return (
    <StyledForm onSubmit={submitHandler}>
      <FlexContainer>
        <InputContainer>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomName',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='room-type'>
            Bed Type<span style={{ color: 'red' }}>*</span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              paddingRight: '62px',
              fontWeight: '400',
            }}
            width='100%'
            id='room-type'
            padding='6px 5px'
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
        </InputContainer>
      </FlexContainer>
      <FlexContainer>
        <InputContainer>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomType',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomNumber',
                newValue: +e.target.value,
              })
            }
          />
        </InputContainer>
      </FlexContainer>
      <FlexContainer>
        <InputContainer>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomFloor',
                newValue: e.target.value,
              })
            }
          />
        </InputContainer>
        <InputContainer>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'ratePerNight',
                newValue: +e.target.value,
              })
            }
          />
        </InputContainer>
      </FlexContainer>
      <FlexContainer style={{ alignItems: 'end' }}>
        <InputContainer style={{ width: 'calc(50% - 5px)' }}>
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
            width='100%'
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomDiscount',
                newValue: +e.target.value,
              })
            }
          />
        </InputContainer>
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
      </FlexContainer>
      <FlexContainer style={{ alignItems: 'start' }}>
        <InputContainer>
          <StyledLabel htmlFor='room-description'>Description</StyledLabel>
          <TextArea
            placeholder='Enter description...'
            id='room-description'
            rows={9}
            width='100%'
            value={roomData.roomDescription}
            onChange={(e) =>
              stateInputsHandler({
                roomProp: 'roomDescription',
                newValue: e.target.value,
              })
            }
          ></TextArea>
        </InputContainer>
        <InputContainer>
          <StyledLabel htmlFor='room-amenities'>
            Amenities<span style={{ color: 'red' }}>*</span>{' '}
            <span style={{ fontSize: '11px' }}>
              (Hold down Ctrl (Windows) or Command (Mac) to select multiple)
            </span>
          </StyledLabel>
          <InputSelect
            style={{
              borderRadius: '4px',
              fontWeight: '400',
              backgroundImage: 'none',
              width: '200px',
              minHeight: '193px',
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
            <strong>Selecteds</strong>:{' '}
            {roomData.facilities.length === 0
              ? !Array.isArray(roomsList)
                ? roomsList?.facilities.join(', ')
                : roomsList[0].facilities.join(', ')
              : roomData.facilities.join(', ')}
          </p>
        </InputContainer>
      </FlexContainer>
      {imageDisplay ? (
        <ImgHolder style={{ margin: '15px auto' }} width='200px' height='200px'>
          <img src={imageDisplay} alt='preview' />
        </ImgHolder>
      ) : (
        ''
      )}
      <InputFileContainer style={{ marginBottom: '25px', maxWidth: '450px' }}>
        <StyledLabel htmlFor='room-images'>
          Upload images<span style={{ color: 'red' }}>*</span>
        </StyledLabel>
        <input
          name='photo'
          type='file'
          id='room-images'
          onChange={(e) => fileInputHandler(e)}
          accept='image/*'
        />
      </InputFileContainer>
      <div style={{ margin: '0 auto', maxWidth: '450px' }}>
        <ButtonGreen
          style={{ width: '100%' }}
          padding='10px 52px'
          type='submit'
        >
          Save room
        </ButtonGreen>
      </div>
    </StyledForm>
  );
};
