import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';

export interface IRoomObj {
  id: number;
  photo: string;
  roomNumber: string;
  roomName: string;
  bedType: string;
  roomFloor: string;
  facilities: Array<string>;
  ratePerNight: number;
  roomDescription?: string;
  status: string;
  offerPrice: null;
}

interface IRoomState {
  roomList: IRoomObj[] | IRoomObj;
  status: 'idle' | 'loading' | 'failed';
  fetchStatus: 'idle' | 'loading' | 'failed';
}

interface ICreateRoom {
  roomsList: IRoomObj[];
  objToInsert: any;
}

interface IUpdateRoom {
  roomsList: IRoomObj[];
  objToUpdate: any;
}

interface IDeleteBooking {
  roomsList: IRoomObj[];
  id: number;
}

interface IFetchPayload {
  url: URL;
  fetchObjProps: RequestInit;
}

const initialState: IRoomState = {
  roomList: [],
  status: 'idle',
  fetchStatus: 'loading',
};

export const fetchRooms = createAsyncThunk(
  'room/fetchRooms',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IRoomObj[]> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const fetchSingleRoom = createAsyncThunk(
  'room/fetchRoom',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IRoomObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IRoomObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IRoomObj[]> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<void> => {
    await APICall({ url, fetchObjProps });
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRoom.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(fetchRooms.pending, fetchSingleRoom.pending),
        (state) => {
          state.fetchStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(createRoom.pending, updateRoom.pending, deleteRoom.pending),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(updateRoom.fulfilled, createRoom.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.roomList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchRooms.fulfilled, fetchSingleRoom.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.roomList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchRooms.rejected, fetchSingleRoom.rejected),
        (state) => {
          state.fetchStatus = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(createRoom.rejected, updateRoom.rejected, deleteRoom.rejected),
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default roomSlice.reducer;
