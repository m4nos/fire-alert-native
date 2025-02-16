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
      })
      .addCase(fetchSlots.rejected, (state) => {
        state.loading = true
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload
        state.loading = false
      })
      .addCase(reserveSlot.pending, (state) => {
        state.loading = true
      })
      .addCase(reserveSlot.rejected, (state) => {
        state.loading = false
      })
      .addCase(reserveSlot.fulfilled, (state, action) => {
        state.slots.push(action.payload)
        state.loading = false
      })
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
