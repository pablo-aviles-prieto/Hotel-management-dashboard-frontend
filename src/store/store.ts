import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomsReducer from './roomSlice';
import bookingsReducer from './bookingSlice';
import usersReducer from './userSlice';
import contactsReducer from './contactSlice';

export const reduxStore = configureStore({
  reducer: {
    rooms: roomsReducer,
    bookings: bookingsReducer,
    users: usersReducer,
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;