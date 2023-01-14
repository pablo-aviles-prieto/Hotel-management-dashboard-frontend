import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';
import { IRoomObj } from './roomSlice';
import { getLocalStorage } from '../utils';

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
  error: string | null;
}

const initialState: IBookingsState = {
  bookingsList: [],
  status: 'idle',
  fetchStatus: 'loading',
  error: null,
};

const API_URI = process.env.REACT_APP_API_URI;

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (): Promise<{ result: IBookingObj[] }> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/bookings`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const fetchSingleBooking = createAsyncThunk(
  'booking/fetchSingleBooking',
  async ({
    id,
  }: {
    id: string | undefined;
  }): Promise<{ result: IBookingObj }> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/bookings/${id}`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async ({ objToSave }: { objToSave: any }): Promise<IBookingObj> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/bookings`),
      fetchObjProps: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToSave),
      },
    });
    return response.json();
  }
);

export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  async ({
    id,
    objToUpdate,
  }: {
    id: string | undefined;
    objToUpdate: any;
  }): Promise<IBookingObj[]> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/bookings/${id}`),
      fetchObjProps: {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToUpdate),
      },
    });
    return response.json();
  }
);

export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async ({ id }: { id: string | undefined }): Promise<void> => {
    const authInfo = getLocalStorage();
    await APICall({
      url: new URL(`${API_URI}/bookings/${id}`),
      fetchObjProps: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
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
          state.fetchStatus = 'idle';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.fulfilled, fetchBookings.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.status = 'idle';
          state.bookingsList = action.payload.result;
          state.error = null;
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
          state.fetchStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.pending, fetchBookings.pending),
        (state) => {
          state.status = 'loading';
          state.fetchStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(
          updateBooking.rejected,
          createBooking.rejected,
          deleteBooking.rejected
        ),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.status = 'failed';
          state.fetchStatus = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleBooking.rejected, fetchBookings.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.status = 'failed';
          state.fetchStatus = 'failed';
        }
      );
  },
});

export default bookingSlice.reducer;
