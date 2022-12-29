import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { APICall } from './APICall';

export interface IContactObj {
  id: number;
  date: string;
  user: { name: string; email: string; phone: string };
  message: { subject: string; body: string };
  rate: number;
  archived?: boolean;
}

interface IContactState {
  contactList: IContactObj[] | IContactObj;
  status: 'idle' | 'loading' | 'failed';
  statusPost: 'idle' | 'loading' | 'failed';
}

interface IFetchPayload {
  url: URL;
  fetchObjProps: RequestInit;
}

const initialState: IContactState = {
  contactList: [],
  status: 'idle',
  statusPost: 'loading',
};

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async ({
    url,
    fetchObjProps,
  }: IFetchPayload): Promise<{ result: IContactObj[] }> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const fetchSingleContact = createAsyncThunk(
  'contact/fetchSingleContact',
  async ({
    url,
    fetchObjProps,
  }: IFetchPayload): Promise<{ result: IContactObj }> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const createContact = createAsyncThunk(
  'contact/createContact',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IContactObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<IContactObj> => {
    const response = await APICall({ url, fetchObjProps });
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async ({ url, fetchObjProps }: IFetchPayload): Promise<void> => {
    await APICall({ url, fetchObjProps });
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contactList = action.payload;
      })
      .addMatcher(
        isAnyOf(fetchContacts.fulfilled, fetchSingleContact.fulfilled),
        (state, action) => {
          state.statusPost = 'idle';
          state.contactList = action.payload.result;
        }
      )
      .addMatcher(
        isAnyOf(deleteContact.fulfilled, updateContact.fulfilled),
        (state) => {
          state.status = 'idle';
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
        }
      )
      .addMatcher(
        isAnyOf(fetchContacts.pending, fetchSingleContact.pending),
        (state) => {
          state.statusPost = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(
          updateContact.rejected,
          createContact.rejected,
          deleteContact.rejected
        ),
        (state) => {
          state.status = 'failed';
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleContact.rejected, fetchContacts.rejected),
        (state) => {
          state.statusPost = 'failed';
        }
      );
  },
});

export default contactSlice.reducer;
