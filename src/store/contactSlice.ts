import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';
import { getLocalStorage } from '../utils';

export interface IContactObj {
  id: string;
  date: string;
  user: { name: string; email: string; phone: string };
  message: { subject: string; body: string };
  rate?: number;
  archived?: boolean;
}

interface IContactState {
  contactList: IContactObj[] | IContactObj;
  status: 'idle' | 'loading' | 'failed';
  statusPost: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: IContactState = {
  contactList: [],
  status: 'idle',
  statusPost: 'loading',
  error: null,
};

const API_URI = process.env.REACT_APP_API_URI;

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async (): Promise<{ result: IContactObj[] }> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/contacts`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const fetchSingleContact = createAsyncThunk(
  'contact/fetchSingleContact',
  async ({
    id,
  }: {
    id: string | undefined;
  }): Promise<{ result: IContactObj }> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/contacts/${id}`),
      fetchObjProps: {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
    return response.json();
  }
);

export const createContact = createAsyncThunk(
  'contact/createContact',
  async ({ objToSave }: { objToSave: any }): Promise<IContactObj> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/contacts`),
      fetchObjProps: {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToSave),
      },
    });
    return response.json();
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async ({
    id,
    objToUpdate,
  }: {
    id: string | undefined;
    objToUpdate: any;
  }): Promise<IContactObj> => {
    const authInfo = getLocalStorage();
    const response = await APICall({
      url: new URL(`${API_URI}/contacts/${id}`),
      fetchObjProps: {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objToUpdate),
      },
    });
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async ({ id }: { id: string | undefined }): Promise<void> => {
    const authInfo = getLocalStorage();
    await APICall({
      url: new URL(`${API_URI}/contacts/${id}`),
      fetchObjProps: {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      },
    });
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, fetchSingleContact.fulfilled),
        (state, action) => {
          state.statusPost = 'idle';
          state.status = 'idle';
          state.contactList = action.payload.result;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          deleteContact.fulfilled,
          updateContact.fulfilled,
          createContact.fulfilled
        ),
        (state) => {
          state.status = 'idle';
          state.statusPost = 'idle';
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          updateContact.pending,
          deleteContact.pending,
          createContact.pending
        ),
        (state) => {
          state.status = 'loading';
          state.statusPost = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.pending, fetchSingleContact.pending),
        (state) => {
          state.statusPost = 'loading';
          state.status = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(
          updateContact.rejected,
          createContact.rejected,
          deleteContact.rejected
        ),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.status = 'failed';
          state.statusPost = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleContact.rejected, fetchContacts.rejected),
        (state, action) => {
          const { message } = action.error;
          state.error = message ? message : 'ERROR! Try again later!';
          state.statusPost = 'failed';
          state.status = 'failed';
        }
      );
  },
});

export default contactSlice.reducer;
