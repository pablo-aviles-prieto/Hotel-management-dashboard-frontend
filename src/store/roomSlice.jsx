import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { mockAPICall } from './mockAPICall';
import { mockRealAPI } from './mockRealAPI';

const initialState = {
  roomList: [],
  status: 'idle',
};

export const fetchRooms = createAsyncThunk('room/fetchRooms', async (data) => {
  const response = await mockAPICall(data);
  return response;
});

export const fetchSingleRoom = createAsyncThunk(
  'room/fetchRoom',
  async (data) => {
    const response = await mockAPICall(data);
    return response;
  }
);

export const createRoom = createAsyncThunk(
  'room/createRoom',
  // async ({ url, fetchProps }) => {
  async ({ roomsList, objToInsert }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const rooms = await mockAPICall(roomsList);
    return { rooms, objToInsert };
  }
);

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  // async ({ url, fetchProps }) => {
  async ({ roomsList, objToUpdate }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const rooms = await mockAPICall(roomsList);
    return { rooms, objToUpdate };
  }
);

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  // async ({ url, fetchProps }) => {
  async ({ roomsList, id }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const rooms = await mockAPICall(roomsList);
    return { rooms, id };
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.fulfilled, (state, action) => {
        const { rooms, objToInsert } = action.payload;
        const offerPrice = objToInsert.checkOffer
          ? Number(
              ((objToInsert.ratePerNight * objToInsert.discount) / 100).toFixed(
                2
              )
            )
          : null;
        const newObjToInsert = {
          ...objToInsert,
          id: rooms.length + 1,
          photo:
            'https://pablo-aviles-prieto.github.io/hotel-management-app/assets/hotel-rooms/room1.jpg',
          status: 'Available',
          offerPrice,
        };
        state.status = 'idle';
        state.roomList = [...rooms, newObjToInsert];
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const { rooms, objToUpdate } = action.payload;
        const newRoomsArr = [...rooms];
        const indexOfObj = newRoomsArr.findIndex(
          (obj) => obj.id === objToUpdate.id
        );
        newRoomsArr[indexOfObj] = objToUpdate;
        state.roomList = newRoomsArr;
        state.status = 'idle';
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        const { rooms, id } = action.payload;
        const filteredArr = rooms.filter((obj) => obj.id !== id);
        console.log('filteredArr roomSlice', filteredArr);
        state.roomList = filteredArr;
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(
          fetchRooms.pending,
          fetchSingleRoom.pending,
          createRoom.pending,
          updateRoom.pending,
          deleteRoom.pending
        ),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchRooms.fulfilled, fetchSingleRoom.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.roomList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchRooms.rejected,
          fetchSingleRoom.rejected,
          createRoom.rejected,
          updateRoom.rejected,
          deleteRoom.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default roomSlice.reducer;
