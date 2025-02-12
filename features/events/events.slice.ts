import { createSlice } from '@reduxjs/toolkit'
import { EventsState } from './events.types'
import {
  createEvent,
  deleteEvent,
  editEvent,
  fetchEvents
} from '@store/events/events.thunk'

const initialState: EventsState = {
  events: [],
  loading: {
    addingEvent: false,
    fetchingEvents: false,
    editingEvent: false,
    deletingEvent: false
  }
}

const eventsSlice = createSlice({
  name: 'eventsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //////////////////
    // FETCH EVENTS //
    //////////////////
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading.fetchingEvents = true
      console.log('fetching events...', action.meta.requestStatus)
    }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
        state.loading.fetchingEvents = false
        state.error = action.payload as Error
      }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading.fetchingEvents = false
        state.events = action.payload
        console.log('fetched events', action.meta.requestStatus)
      }),
      //////////////////
      // CREATE EVENT //
      //////////////////
      builder.addCase(createEvent.pending, (state, action) => {
        state.loading.addingEvent = true
        console.log('adding event...', action.meta.requestStatus)
      }),
      builder.addCase(createEvent.rejected, (state, action) => {
        state.loading.addingEvent = false
        state.error = action.payload as Error
      }),
      builder.addCase(createEvent.fulfilled, (state, action) => {
        state.loading.addingEvent = false
        state.events.push(action.payload)
        console.log('event added!', action.meta.requestStatus)
      }),
      ////////////////
      // EDIT EVENT //
      ////////////////
      builder.addCase(editEvent.pending, (state, action) => {
        state.loading.editingEvent = true
        console.log('editing event...', action.meta.requestStatus)
      }),
      builder.addCase(editEvent.rejected, (state, action) => {
        state.loading.editingEvent = false
        state.error = action.payload as Error
      }),
      builder.addCase(editEvent.fulfilled, (state, action) => {
        state.loading.editingEvent = false

        const event = state.events.find(
          (event) => event.id === action.payload.id
        )
        if (event) {
          Object.assign(event, action.payload)
        }
        console.log('event edited successfully!', action.meta.requestStatus)
      }),
      //////////////////
      // DELETE EVENT //
      //////////////////
      builder.addCase(deleteEvent.pending, (state, action) => {
        state.loading.fetchingEvents = true
        console.log(
          `deleting event ${action.meta.arg}...`,
          action.meta.requestStatus
        )
      }),
      builder.addCase(deleteEvent.rejected, (state, action) => {
        state.loading.fetchingEvents = false
        state.error = action.payload as Error
      }),
      builder.addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading.fetchingEvents = false
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        )
        console.log('fetched events', action.meta.requestStatus)
      })
  }
})

export const {} = eventsSlice.actions
export default eventsSlice.reducer
