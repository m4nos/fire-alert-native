import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import uiReducer from "./slices/ui.slice";

// const rootReducer = combineReducers(userReducer);

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
