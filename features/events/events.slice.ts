import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './events.types';
import { fetchEvents } from '@store/events/events.thunk';

const initialState: EventsState = {
  events: [],
  loading: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, action) => (state.events = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = true;
      console.log('fetching events...', action.meta.requestStatus);
    }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        console.log('fetched events', action.meta.requestStatus);
      });
  },
});

export const { setEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
