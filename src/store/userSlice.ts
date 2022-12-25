import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';

export interface IUserObj {
  id: number;
  photo: string;
  name: string;
  email: string;
  startDate: string;
  job: { position: string; description: string; schedule: string };
  contact: string;
  status: string;
}

interface IUserState {
  usersList: IUserObj[] | IUserObj;
  status: 'idle' | 'loading' | 'failed';
  fetchStatus: 'idle' | 'loading' | 'failed';
}

interface IFetchPayload {
  url: URL;
  fetchObjProps: RequestInit;
}

const initialState: IUserState = {
  usersList: [],
  status: 'idle',
  fetchStatus: 'loading',
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IUserObj[]> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IUserObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IUserObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IUserObj[]> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<void> => {
    await APICall({ url, fetchObjProps });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(createUser.fulfilled, updateUser.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.usersList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled, fetchSingleUser.fulfilled),
        (state, action) => {
          state.fetchStatus = 'idle';
          state.usersList = action.payload;
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
        (state) => {
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
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default userSlice.reducer;
