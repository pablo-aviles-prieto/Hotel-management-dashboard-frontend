import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';
import { getLocalStorage } from '../utils';
import { IUserObj } from '../interfaces';

interface IUserState {
  usersList: IUserObj[] | IUserObj;
  status: 'idle' | 'loading' | 'failed';
  fetchStatus: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: IUserState = {
  usersList: [],
  status: 'idle',
  fetchStatus: 'loading',
  error: null,
};

const API_URI = process.env.REACT_APP_API_URI;

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (): Promise<{ result: IUserObj[] }> => {
    const response = await APICall({
      url: new URL(`${API_URI}/users`),
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

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async ({ id }: { id: string | undefined }): Promise<{ result: IUserObj }> => {
    const response = await APICall({
      url: new URL(`${API_URI}/users/${id}`),
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

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ objToSave }: { objToSave: any }): Promise<IUserObj> => {
    const response = await APICall({
      url: new URL(`${API_URI}/users`),
      fetchObjProps: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToSave),
      },
    });
    return await response.json();
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({
    id,
    objToUpdate,
  }: {
    id: string | undefined;
    objToUpdate: any;
  }): Promise<IUserObj[]> => {
    const response = await APICall({
      url: new URL(`${API_URI}/users/${id}`),
      fetchObjProps: {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToUpdate),
      },
    });
    return response.json();
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ id }: { id: string | undefined }): Promise<void> => {
    await APICall({
      url: new URL(`${API_URI}/users/${id}`),
      fetchObjProps: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getLocalStorage()?.token}`,
        },
      },
    });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          deleteUser.fulfilled,
          updateUser.fulfilled,
          createUser.fulfilled
        ),
        (state) => {
          state.status = 'idle';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled, fetchSingleUser.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.usersList = action.payload.result;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.pending, fetchSingleUser.pending),
        (state) => {
          state.fetchStatus = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.rejected, fetchSingleUser.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.fetchStatus = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(createUser.pending, deleteUser.pending, updateUser.pending),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(createUser.rejected, deleteUser.rejected, updateUser.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.status = 'failed';
        }
      );
  },
});

export default userSlice.reducer;
