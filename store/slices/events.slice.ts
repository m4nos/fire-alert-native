import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseStore } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Events, EventsState } from "../types/events.types";

const initialState: EventsState = {
  events: [],
  loading: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvent: (state, action) => (state.events = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      });
  },
});

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  try {
    const eventsCollection = query(collection(FirebaseStore, "events"));
    const eventsSnapshot = await getDocs(eventsCollection);

    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Events[];

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
});

export default eventsSlice.reducer;
