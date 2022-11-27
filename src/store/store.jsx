import { configureStore } from '@reduxjs/toolkit';
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
