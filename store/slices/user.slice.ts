import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseStore } from "../../firebase";
import { AppUser, UserState } from "../types/user.types";

const initialState: UserState = {
  firebaseUser: null,
  appUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirebaseUser: (state, action: PayloadAction<User>) => {
      state.firebaseUser = action.payload;
      console.log("user set");
    },
    clearUser: (state) => {
      state.firebaseUser = null;
      state.appUser = null;
      console.log("user deleted");
    },
    setAppUser: (state, action) => (state.appUser = action.payload),
    setLoading: (state, action) => (state.loading = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(fetchAppUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchAppUser.fulfilled, (state, action) => {
        state.loading = false;
        state.appUser = action.payload;
      }),
      builder.addCase(updateAppUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(updateAppUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(updateAppUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const fetchAppUser = createAsyncThunk<AppUser | null, string>(
  "user/fetchAppUser",
  async (uid: string, { dispatch }) => {
    try {
      // Perform query to find user document with matching uid
      const userQuery = query(
        collection(FirebaseStore, "users"),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(userQuery);

      console.log("fetched");

      // Check if any matching documents were found
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique uid)
        const userDoc = querySnapshot.docs[0];
        // Extract user data from document
        const userData = userDoc.data() as AppUser;
        return userData;
      } else {
        // No matching user found
        return null;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const updateAppUser = createAsyncThunk(
  "user/updateAppUser",
  async (profileData: Partial<AppUser>, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      // Query Firestore to find the document with the user's email
      const userQuery = query(
        collection(FirebaseStore, "users"),
        where("email", "==", profileData.email)
      );
      const querySnapshot = await getDocs(userQuery);

      // Check if any documents match the query
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique email)
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(FirebaseStore, "users", userDoc.id);

        // Update the existing document with the new user data
        await updateDoc(userDocRef, profileData);
        console.log("User data updated successfully");
      } else {
        console.log("No matching document found for the user email");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
      throw error; // Rethrow the error to handle it in the calling code
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default userSlice.reducer;
export const { setFirebaseUser, clearUser, setAppUser, setLoading } =
  userSlice.actions;
