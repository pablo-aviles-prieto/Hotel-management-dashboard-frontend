import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockAPICall } from './mockAPICall';

const initialState = {
  roomList: [],
  status: 'loading',
};

export const fetchRooms = createAsyncThunk('room/fetchRooms2', async (data) => {
  const response = await mockAPICall(data);
  return response;
});

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.roomList = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default roomSlice.reducer;
