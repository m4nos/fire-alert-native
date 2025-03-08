import { createSlice } from '@reduxjs/toolkit'
import { Slot } from './slots.types'
import { fetchSlots, reserveSlot } from './slots.thunk'

interface SlotsState {
  slots: Slot[]
  loading: boolean
  error: string | null
}

const initialState: SlotsState = {
  slots: [],
  loading: false,
  error: null
}

const shiftsSlice = createSlice({
  name: 'shiftsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true
        console.log('fetching slots...')
      })
      .addCase(fetchSlots.rejected, (state) => {
        state.loading = true
        console.error('error fetching slots!')
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload
        state.loading = false
        console.log('slots fetched!')
      })
      .addCase(reserveSlot.pending, (state) => {
        state.loading = true
        console.log('reserving slot...')
      })
      .addCase(reserveSlot.rejected, (state) => {
        state.loading = false
        console.error('error reserving slot!')
      })
      .addCase(reserveSlot.fulfilled, (state, action) => {
        state.slots.push(action.payload)
        state.loading = false
        console.log('slot reserved!')
      })
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
