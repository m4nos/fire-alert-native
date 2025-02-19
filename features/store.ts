import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.slice'
import mapReducer from './map/map.slice'
import shiftsReducer from './shifts/shifts.slice'
import slotsReducer from './slots/slots.slice'

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    mapSlice: mapReducer,
    shiftsSlice: shiftsReducer,
    slotsSlice: slotsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
