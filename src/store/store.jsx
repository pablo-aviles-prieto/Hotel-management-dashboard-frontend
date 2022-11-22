import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './roomSlice';

export const reduxStore = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});
