import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseAuth, FirebaseStore } from "../../firebase";

export interface FireAlertUser {
  phoneNumber: string;
  email: string;
  [key: string]: any; // Add index signature to accommodate dynamic keys
}

interface UserState {
  firebaseUser: User | null;
  user: FireAlertUser | null;
  loading: boolean;
  error: Error | null;
}

const initialState: UserState = {
  firebaseUser: null,
  user: null,
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
      state.user = null;
      console.log("user deleted");
    },
    setUser: (state, action) => (state.user = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFireAlertUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(fetchFireAlertUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchFireAlertUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      }),
      builder.addCase(setFireAlertUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(setFireAlertUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(setFireAlertUser.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const checkAuthStatus = createAsyncThunk(
  // FIXME: this thunk causes many rerenders
  "user/checkAuthStatus",
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(FirebaseAuth, (user) => {
        if (user) {
          dispatch(setFirebaseUser(user.toJSON() as User));
        } else {
          dispatch(clearUser());
        }
        resolve(user);
      });
    });
  }
);

export const fetchFireAlertUser = createAsyncThunk(
  "user/fetchFireAlertUser",
  async (email: string) => {
    try {
      // Perform query to find user document with matching email
      const userQuery = query(
        collection(FirebaseStore, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(userQuery);

      console.log("fetched");

      // Check if any matching documents were found
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique email)
        const userDoc = querySnapshot.docs[0];
        // Extract user data from document
        const userData = userDoc.data();
        return userData as FireAlertUser;
      } else {
        // No matching user found
        return null;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const setFireAlertUser = createAsyncThunk(
  "user/setFireAlertUser",
  async (profileData: FireAlertUser) => {
    try {
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
    }
  }
);

export default userSlice.reducer;
export const { setFirebaseUser, clearUser, setUser } = userSlice.actions;
