import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './roomSlice';
import bookingsReducer from './bookingSlice';

export const reduxStore = configureStore({
  reducer: {
    rooms: roomsReducer,
    bookings: bookingsReducer,
  },
});
