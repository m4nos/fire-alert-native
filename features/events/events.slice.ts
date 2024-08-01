import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './events.types';
import { addEvent, fetchEvents } from '@store/events/events.thunk';

const initialState: EventsState = {
  events: [],
  loading: {
    addingEvent: false,
    fetchingEvents: false,
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, action) => (state.events = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading.fetchingEvents = true;
      console.log('fetching events...', action.meta.requestStatus);
    }),
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading.fetchingEvents = false;
      state.error = action.payload as Error;
    }),
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading.fetchingEvents = false;
      state.events = action.payload;
      console.log('fetched events', action.meta.requestStatus);
    }),
    builder.addCase(addEvent.pending, (state, action) => {
      state.loading.addingEvent = true;
      console.log('fetching events...', action.meta.requestStatus);
    }),
    builder.addCase(addEvent.rejected, (state, action) => {
      state.loading.addingEvent = false;
      state.error = action.payload as Error;
    }),
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.loading.addingEvent = false;
      // TODO: add new event to store events
      console.log('added event', action.meta.requestStatus);
    });
  },
});

export const { setEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
