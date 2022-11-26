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

// export const updateBooking = createAsyncThunk(
//   'booking/updateBooking',
//   // async ({ url, fetchProps }) => {
//   async ({ bookingsList, objToUpdate }) => {
//     // const response = await mockRealAPI({ url, fetchProps });
//     const bookings = await mockAPICall(bookingsList);
//     return { bookings, objToUpdate };
//   }
// );

// export const deleteBooking = createAsyncThunk(
//   'booking/deleteBooking',
//   // async ({ url, fetchProps }) => {
//   async ({ bookingsList, id }) => {
//     // const response = await mockRealAPI({ url, fetchProps });
//     const bookings = await mockAPICall(bookingsList);
//     return { bookings, id };
//   }
// );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        const { users, objToInsert } = action.payload;
        const newObjToInsert = {
          ...objToInsert,
          id: users.length + 1,
          photo:
            'https://www.pngkey.com/png/detail/308-3081138_contact-avatar-generic.png',
          startDate: new Date().toLocaleDateString(),
        };
        state.status = 'idle';
        state.usersList = [...users, newObjToInsert];
      })
      .addMatcher(
        isAnyOf(
          fetchUsers.pending,
          fetchSingleUser.pending,
          createUser.pending
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
          createUser.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      );
  },
});

export default userSlice.reducer;
