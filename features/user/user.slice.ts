import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './user.types';
import {
  fetchAppUser,
  login,
  logout,
  signUp,
  updateAppUser,
} from '@store/user/user.thunk';

const initialState: UserState = {
  firebaseUser: null,
  appUser: null,
  loading: {
    login: false,
    signUp: false,
    logout: false,
    fetchAppUser: false,
    updateAppUser: false,
  },
  error: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///////////
    // LOGIN //
    ///////////
    builder.addCase(login.pending, (state) => {
      state.loading.login = true;
      state.error = null;
      console.log('logging in...');
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading.login = false;
        state.firebaseUser = action.payload;
        console.log('logged in!');
      }),
      ////////////
      // SIGNUP //
      ////////////
      builder.addCase(signUp.pending, (state) => {
        state.loading.signUp = true;
        state.error = null;
        console.log('signing up...');
      }),
      builder.addCase(signUp.rejected, (state, action) => {
        state.loading.signUp = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(signUp.fulfilled, (state) => {
        state.loading.signUp = false;
        console.log('signed up!');
      }),
      ////////////
      // LOGOUT //
      ////////////
      builder.addCase(logout.pending, (state) => {
        state.loading.logout = true;
        state.error = null;
        console.log('logging out...');
      }),
      builder.addCase(logout.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(logout.fulfilled, (state) => {
        state.loading.logout = false;
        state.appUser = null;
        state.firebaseUser = null;
        console.log('logged out!');
      }),
      ////////////////////
      // FETCH APP USER //
      ////////////////////
      builder.addCase(fetchAppUser.pending, (state) => {
        state.loading.fetchAppUser = true;
        state.error = null;
        console.log('fetching user...');
      }),
      builder.addCase(fetchAppUser.rejected, (state, action) => {
        state.loading.fetchAppUser = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchAppUser.fulfilled, (state, action) => {
        state.loading.fetchAppUser = false;
        state.appUser = action.payload;
        console.log('user fetched!');
      }),
      /////////////////////
      // UPDATE APP USER //
      /////////////////////
      builder.addCase(updateAppUser.pending, (state) => {
        state.loading.updateAppUser = true;
        state.error = null;
        console.log('updating user...');
      }),
      builder.addCase(updateAppUser.rejected, (state, action) => {
        state.loading.updateAppUser = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(updateAppUser.fulfilled, (state) => {
        state.loading.updateAppUser = false;
        console.log('user updated!');
      });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
