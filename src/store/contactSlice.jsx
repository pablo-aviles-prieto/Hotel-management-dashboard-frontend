import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { mockAPICall } from './mockAPICall';
import { mockRealAPI } from './mockRealAPI';
import contactsData from '../assets/data/comments.json';

const initialState = {
  contactList: [],
  status: 'loading',
  statusPost: 'idle',
};

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async () => {
    const response = await mockAPICall(contactsData);
    return response;
  }
);

export const fetchSingleContact = createAsyncThunk(
  'contact/fetchSingleContact',
  async (data) => {
    const response = await mockAPICall(data);
    return response;
  }
);

export const createContact = createAsyncThunk(
  'contact/createContact',
  // async ({ url, fetchProps }) => {
  async ({ objToInsert }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const contacts = await mockAPICall(contactsData);
    return { contacts, objToInsert };
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  // async ({ url, fetchProps }) => {
  async ({ objToUpdate }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const contacts = await mockAPICall(contactsData);
    return { contacts, objToUpdate };
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  // async ({ url, fetchProps }) => {
  async ({ id }) => {
    // const response = await mockRealAPI({ url, fetchProps });
    const contacts = await mockAPICall(contactsData);
    return { contacts, id };
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.fulfilled, (state, action) => {
        const { contacts, objToInsert } = action.payload;
        state.statusPost = 'idle';
        state.contactList = [...contacts, objToInsert];
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const { contacts, objToUpdate } = action.payload;
        const newContactsArr = [...contacts];
        const indexOfObj = newContactsArr.findIndex(
          (obj) => obj.id === objToUpdate.id
        );
        newContactsArr[indexOfObj] = {
          ...newContactsArr[indexOfObj],
          ...objToUpdate,
        };
        state.statusPost = 'idle';
        state.contactList = newContactsArr;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        const { contacts, id } = action.payload;
        const filteredArr = contacts.filter((obj) => obj.id !== id);
        console.log('filteredArr contactSlice', filteredArr);
        state.contactList = filteredArr;
        state.status = 'idle';
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          fetchSingleContact.pending,
          deleteContact.pending
        ),
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, fetchSingleContact.fulfilled),
        (state, action) => {
          state.status = 'idle';
          state.contactList = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          fetchSingleContact.rejected,
          deleteContact.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(createContact.pending, updateContact.pending),
        (state) => {
          state.statusPost = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(createContact.rejected, updateContact.rejected),
        (state) => {
          state.statusPost = 'failed';
        }
      );
  },
});

export default contactSlice.reducer;
