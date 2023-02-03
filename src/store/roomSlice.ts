import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';
import { getLocalStorage } from '../utils';
import { IRoomObj } from '../interfaces';

interface IRoomState {
  roomList: IRoomObj[] | IRoomObj;
  status: 'idle' | 'loading' | 'failed';
  fetchStatus: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: IRoomState = {
  roomList: [],
  status: 'idle',
  fetchStatus: 'loading',
  error: null,
};

const API_URI = process.env.REACT_APP_API_URI;

export const fetchRooms = createAsyncThunk(
  'room/fetchRooms',
  async (): Promise<{ result: IRoomObj[] }> => {
    const response = await APICall({
      url: new URL(`${API_URI}/rooms`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const fetchSingleRoom = createAsyncThunk(
  'room/fetchRoom',
  async ({ id }: { id: string | undefined }): Promise<{ result: IRoomObj }> => {
    const response = await APICall({
      url: new URL(`${API_URI}/rooms/${id}`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const createRoom = createAsyncThunk(
  'room/createRoom',
  async ({ objToSave }: { objToSave: any }): Promise<IRoomObj> => {
    const response = await APICall({
      url: new URL(`${API_URI}/rooms`),
      fetchObjProps: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
          Accept: 'application/json, text/plain, /',
        },
        body: objToSave,
      },
    });
    return response.json();
  }
);

export const updateRoom = createAsyncThunk(
  'room/updateRoom',
  async ({
    id,
    objToUpdate,
  }: {
    id: string | undefined;
    objToUpdate: any;
  }): Promise<IRoomObj[]> => {
    const response = await APICall({
      url: new URL(`${API_URI}/rooms/${id}`),
      fetchObjProps: {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
          Accept: 'application/json, text/plain, /',
        },
        body: objToUpdate,
      },
    });
    return response.json();
  }
);

export const deleteRoom = createAsyncThunk(
  'room/deleteRoom',
  async ({ id }: { id: string | undefined }): Promise<void> => {
    await APICall({
      url: new URL(`${API_URI}/rooms/${id}`),
      fetchObjProps: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
        },
      },
    });
  }
);

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoom.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
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
        isAnyOf(updateRoom.fulfilled, deleteRoom.fulfilled),
        (state) => {
          // Removing from the state the photo prop when a user is updated/deleted so it doesnt make a request for that photo since is no longer in the back and would got a 404 in the re-render cycles of react
          if (!Array.isArray(state.roomList)) {
            state.roomList.photo = '';
          }
          state.status = 'idle';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchRooms.fulfilled, fetchSingleRoom.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.roomList = action.payload.result;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchRooms.rejected, fetchSingleRoom.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.fetchStatus = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(createRoom.rejected, updateRoom.rejected, deleteRoom.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.status = 'failed';
        }
      );
  },
});

export default roomSlice.reducer;
