import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { mockAPICall } from './mockAPICall';
import { mockRealAPI } from './mockRealAPI';

const initialState = {
  usersList: [],
  status: 'idle',
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (data) => {
  const response = await mockAPICall(data);
  return response;
});

export const fetchSingleUser = createAsyncThunk(
  'user/fetchSingleUser',
  async (data) => {
    const response = await mockAPICall(data);
    return response;
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  // async ({ url, fetchProps }) => {
  async ({ usersList, objToInsert }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const users = await mockAPICall(usersList);
    return { users, objToInsert };
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  // async ({ url, fetchProps }) => {
  async ({ usersList, objToUpdate }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const users = await mockAPICall(usersList);
    return { users, objToUpdate };
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  // async ({ url, fetchProps }) => {
  async ({ usersList, id }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const users = await mockAPICall(usersList);
    return { users, id };
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        const { users, objToInsert } = action.payload;
        state.status = 'idle';
        state.usersList = [...users, objToInsert];
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { users, objToUpdate } = action.payload;
        const newUsersArr = [...users];
        const indexOfObj = newUsersArr.findIndex(
          (obj) => obj.id === objToUpdate.id
        );
        newUsersArr[indexOfObj] = {
          ...newUsersArr[indexOfObj],
          ...objToUpdate,
        };
        state.usersList = newUsersArr;
        state.status = 'idle';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { users, id } = action.payload;
        const filteredArr = users.filter((obj) => obj.id !== id);
        console.log('filteredArr userSlice', filteredArr);
        state.usersList = filteredArr;
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(
          fetchUsers.pending,
          fetchSingleUser.pending,
          createUser.pending,
          deleteUser.pending
        ),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchUsers.fulfilled, fetchSingleUser.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.usersList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchUsers.rejected,
          fetchSingleUser.rejected,
          createUser.rejected,
          deleteUser.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default userSlice.reducer;
