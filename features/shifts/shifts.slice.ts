import { createSlice } from '@reduxjs/toolkit'
import { Shift } from './shifts.types'
import { createShift, deleteShift, fetchShifts } from './shifts.thunk'

interface ShiftsState {
  shifts: Shift[]
  loading: boolean
  error: string | null
}

const initialState: ShiftsState = {
  shifts: [],
  loading: false,
  error: null
}

const shiftsSlice = createSlice({
  name: 'shiftsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchShifts.rejected, (state) => {
        state.loading = true
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts = action.payload
        state.loading = false
      })
      .addCase(createShift.pending, (state) => {
        state.loading = true
      })
      .addCase(createShift.rejected, (state) => {
        state.loading = false
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.shifts.push(action.payload)
        state.loading = false
      })
      .addCase(deleteShift.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete shift'
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.shifts = state.shifts.filter(shift => shift.id !== action.payload)
        state.loading = false
      })
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
