import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from './events.types';
import { createEvent, fetchEvents } from '@store/events/events.thunk';

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
  reducers: {},
  extraReducers: (builder) => {
    //////////////////
    // FETCH EVENTS //
    //////////////////
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
      //////////////////
      // CREATE EVENT //
      //////////////////
      builder.addCase(createEvent.pending, (state, action) => {
        state.loading.addingEvent = true;
        console.log('adding event...', action.meta.requestStatus);
      }),
      builder.addCase(createEvent.rejected, (state, action) => {
        state.loading.addingEvent = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(createEvent.fulfilled, (state, action) => {
        state.loading.addingEvent = false;
        state.events.push(action.payload);
        console.log('event added!', action.meta.requestStatus);
      });
  },
});

export const {} = eventsSlice.actions;
export default eventsSlice.reducer;
