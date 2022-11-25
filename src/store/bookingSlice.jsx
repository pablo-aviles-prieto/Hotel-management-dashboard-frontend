import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { mockAPICall } from './mockAPICall';
import { mockRealAPI } from './mockRealAPI';

const initialState = {
  bookingsList: [],
  status: 'idle',
};

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (data) => {
    const response = await mockAPICall(data);
    return response;
  }
);

export const fetchSingleBooking = createAsyncThunk(
  'booking/fetchSingleBooking',
  async (data) => {
    const response = await mockAPICall(data);
    return response;
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  // async ({ url, fetchProps }) => {
  async ({ bookingsList, objToInsert }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const bookings = await mockAPICall(bookingsList);
    return { bookings, objToInsert };
  }
);

export const updateBooking = createAsyncThunk(
  'booking/updateBooking',
  // async ({ url, fetchProps }) => {
  async ({ bookingsList, objToUpdate }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const bookings = await mockAPICall(bookingsList);
    return { bookings, objToUpdate };
  }
);

export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  // async ({ url, fetchProps }) => {
  async ({ bookingsList, id }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const bookings = await mockAPICall(bookingsList);
    return { bookings, id };
  }
);

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBooking.fulfilled, (state, action) => {
        const { bookings, objToUpdate } = action.payload;
        const newBookingsArr = [...bookings];
        const indexOfObj = newBookingsArr.findIndex(
          (obj) => obj.id === objToUpdate.id
        );
        newBookingsArr[indexOfObj] = {
          ...newBookingsArr[indexOfObj],
          ...objToUpdate,
        };
        console.log('newBookingsArr', newBookingsArr);
        state.bookingsList = newBookingsArr;
        state.status = 'idle';
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        const { bookings, objToInsert } = action.payload;
        const newObjToInsert = {
          ...objToInsert,
          id: bookings.length + 1,
        };
        console.log('[...bookings, newObjToInsert] bookingSlice', [
          ...bookings,
          newObjToInsert,
        ]);
        state.bookingsList = [...bookings, newObjToInsert];
        state.status = 'idle';
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        const { bookings, id } = action.payload;
        const filteredArr = bookings.filter((obj) => obj.id !== id);
        console.log('filteredArr bookingSlice', filteredArr);
        state.bookingsList = filteredArr;
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(
          fetchBookings.pending,
          fetchSingleBooking.pending,
          updateBooking.pending,
          createBooking.pending,
          deleteBooking.pending
        ),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchBookings.fulfilled, fetchSingleBooking.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.bookingsList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchBookings.rejected,
          fetchSingleBooking.rejected,
          updateBooking.rejected,
          createBooking.rejected,
          deleteBooking.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default bookingSlice.reducer;
