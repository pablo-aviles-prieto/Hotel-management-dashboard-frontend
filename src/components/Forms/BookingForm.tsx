import {
  StyledForm,
  StyledLabel,
  InputText,
  InputDate,
  InputSelect,
  TextArea,
  ButtonGreen,
} from '../Styles';
import { IBookingData, IRoomObj } from '../../interfaces';

type IStateInputsHandlerPops = {
  bookingProp: keyof IBookingData;
  newValue: IBookingData[keyof IBookingData];
};

interface IProps {
  stateInputsHandler: ({
    bookingProp,
    newValue,
  }: IStateInputsHandlerPops) => void;
  submitHandler: (e: React.FormEvent) => Promise<void>;
  setBookedRoom: (value: React.SetStateAction<string>) => void;
  bookingData: IBookingData;
  bookedRoom: string;
  roomsArray: IRoomObj[];
}

const bookingStatusOptions = [
  {
    label: 'in progress',
  },
  {
    label: 'check out',
  },
  {
    label: 'check in',
  },
];

export const BookingForm: React.FC<IProps> = ({
  stateInputsHandler,
  submitHandler,
  setBookedRoom,
  bookingData,
  bookedRoom,
  roomsArray,
}) => {
  return (
    <StyledForm onSubmit={submitHandler}>
      <div>
        <StyledLabel htmlFor='booking-number'>
          Number<span style={{ color: 'red' }}>*</span>
        </StyledLabel>
        <InputText
          borderRadius='4px'
          padding='5px'
          name='booking-number'
          placeholder='number...'
          value={bookingData.bookingNumber}
          id='booking-number'
          min={1}
          type='number'
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'bookingNumber',
              newValue: +e.target.value,
            })
          }
        />
      </div>
      <div>
        <StyledLabel htmlFor='booking-checkin'>
          Check in<span style={{ color: 'red' }}>*</span>
        </StyledLabel>
        <InputDate
          borderRadius='4px'
          padding='5px'
          name='booking-checkin'
          value={bookingData.checkIn}
          id='booking-checkin'
          type='date'
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'checkIn',
              newValue: e.target.value,
            })
          }
        />
      </div>
      <div>
        <StyledLabel htmlFor='booking-checkout'>
          Check out<span style={{ color: 'red' }}>*</span>
        </StyledLabel>
        <InputDate
          borderRadius='4px'
          padding='5px'
          name='booking-checkout'
          value={bookingData.checkOut}
          id='booking-checkout'
          type='date'
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'checkOut',
              newValue: e.target.value,
            })
          }
        />
      </div>
      <div>
        <StyledLabel htmlFor='booking-userName'>
          Booked by user<span style={{ color: 'red' }}>*</span>
        </StyledLabel>
        <InputText
          borderRadius='4px'
          padding='5px'
          name='booking-userName'
          placeholder='booked by...'
          value={bookingData.userName}
          id='booking-userName'
          type='text'
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'userName',
              newValue: e.target.value,
            })
          }
        />
      </div>
      <div>
        <StyledLabel htmlFor='special-request'>Special request</StyledLabel>
        <TextArea
          placeholder='Special request...'
          id='special-request'
          rows={5}
          value={bookingData.specialRequest}
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'specialRequest',
              newValue: e.target.value,
            })
          }
        ></TextArea>
      </div>
      <div>
        <StyledLabel htmlFor='booking-status'>Status</StyledLabel>
        <InputSelect
          style={{
            borderRadius: '4px',
            paddingRight: '62px',
            fontWeight: '400',
            minWidth: '175px',
          }}
          id='booking-status'
          padding='8px 5px'
          positionArrowY='0'
          value={bookingData.status}
          onChange={(e) =>
            stateInputsHandler({
              bookingProp: 'status',
              newValue: e.target.value,
            })
          }
        >
          {bookingStatusOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </InputSelect>
      </div>
      <div>
        <StyledLabel htmlFor='booking-roomId'>Booked room</StyledLabel>
        <InputSelect
          style={{
            borderRadius: '4px',
            paddingRight: '62px',
            fontWeight: '400',
            minWidth: '175px',
          }}
          id='booking-roomId'
          padding='8px 5px'
          positionArrowY='0'
          value={bookedRoom}
          onChange={(e) => setBookedRoom(e.target.value)}
        >
          {roomsArray.map((room) => (
            <option key={room.id} value={room.id}>
              ID {room.id}: {room.roomName}
            </option>
          ))}
        </InputSelect>
      </div>
      <div style={{ marginTop: '25px' }}>
        <ButtonGreen padding='10px 52px' type='submit'>
          Save booking
        </ButtonGreen>
      </div>
    </StyledForm>
  );
};
