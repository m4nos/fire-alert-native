import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseStore } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Event, EventsState } from "../types/events.types";

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
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = true;
      console.log("fetching events...", action.meta.requestStatus);
    }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        console.log("fetched events", action.meta.requestStatus);
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
    })) as Event[];

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const { setEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
