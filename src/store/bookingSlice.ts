import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';
import { IRoomObj } from './roomSlice';

export interface IBookingObj {
  id: string;
  bookingNumber: number;
  userName: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  status: string;
  roomId: IRoomObj;
}

interface IBookingsState {
  bookingsList: IBookingObj[] | IBookingObj;
  status: 'idle' | 'loading' | 'failed';
  fetchStatus: 'idle' | 'loading' | 'failed';
}

interface IFetchPayload {
  url: URL;
  fetchObjProps: RequestInit;
}

const initialState: IBookingsState = {
  bookingsList: [],
  status: 'idle',
  fetchStatus: 'loading',
};

// export const fetchBookings = createAsyncThunk(
//   'booking/fetchBookings',
//   async ({
//     url,
//     fetchObjProps,
//   }: IFetchPayload): Promise<{ result: IBookingObj[] }> => {
//     const response = await APICall({ url, fetchObjProps });
//     return response.json();
//   }
// );

export const fetchSingleBooking = createAsyncThunk(
  'booking/fetchSingleBooking',
  async ({
    url,
    fetchObjProps,
  }: IFetchPayload): Promise<{ result: IBookingObj }> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IBookingObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IBookingObj[]> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<void> => {
    await APICall({ url, fetchObjProps });
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          deleteBooking.fulfilled,
          updateBooking.fulfilled,
          createBooking.fulfilled
        ),
        (state) => {
          state.status = 'idle';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.fulfilled, fetchBookings.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.bookingsList = action.payload.result;
        }
      )
      .addMatcher(
        isAnyOf(
          updateBooking.pending,
          createBooking.pending,
          deleteBooking.pending
        ),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.pending, fetchBookings.pending),
        (state) => {
          state.fetchStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(
          updateBooking.rejected,
          createBooking.rejected,
          deleteBooking.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.rejected, fetchBookings.rejected),
        (state) => {
          state.fetchStatus = 'failed';
        }
      );
  },
});

export default bookingSlice.reducer;
