import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      console.log("user set");
    },
    logoutUser: (state) => {
      state.user = null;
      console.log("user deleted");
    },
  },
});

export default userSlice.reducer;
export const { setUser, logoutUser } = userSlice.actions;
