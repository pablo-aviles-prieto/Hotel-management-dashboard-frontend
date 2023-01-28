import {
  StyledLabel,
  InputText,
  InputSelect,
  CheckBoxContainer,
  TextArea,
  ButtonGreen,
} from '../Styles';
import styled from 'styled-components';
import { IRoomData } from '../../interfaces';
import { IRoomObj } from '../../store/roomSlice';
import { facilitiesArray as roomAmenitiesOptionsSelect } from '../../utils';

const StyledForm = styled.form`
  div {
    margin-bottom: 10px;
  }
  label {
    display: block;
  }
`;

type IStateInputsHandlerPops = {
  roomProp: keyof IRoomData;
  newValue: IRoomData[keyof IRoomData];
};

interface IProps {
  stateInputsHandler: ({ roomProp, newValue }: IStateInputsHandlerPops) => void;
  submitHandler: (e: React.FormEvent) => Promise<void>;
  facilitiesHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  roomData: IRoomData;
  roomsList: IRoomObj | IRoomObj[];
}

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

export const RoomForm: React.FC<IProps> = ({
  stateInputsHandler,
  submitHandler,
  facilitiesHandler,
  roomData,
  roomsList,
}) => {
  return (
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
        <TextArea
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
        ></TextArea>
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
            ? !Array.isArray(roomsList)
              ? roomsList.facilities.join(', ')
              : roomsList[0].facilities.join(', ')
            : roomData.facilities.join(', ')}
        </p>
      </div>
      <div>
        <ButtonGreen padding='10px 52px' type='submit'>
          Save room
        </ButtonGreen>
      </div>
    </StyledForm>
  );
};
