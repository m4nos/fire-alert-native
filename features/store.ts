import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user.slice';
import mapReducer from './map/map.slice';
import eventsReducer from './events/events.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    map: mapReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
