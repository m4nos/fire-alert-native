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
        console.log('fetching shifts...')
      })
      .addCase(fetchShifts.rejected, (state) => {
        state.loading = true
        console.error('error fetching shifts!')
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts = action.payload
        state.loading = false
        console.log('shifts fetched!')
      })
      .addCase(createShift.pending, (state) => {
        state.loading = true
        console.log('creating shift...')
      })
      .addCase(createShift.rejected, (state) => {
        state.loading = false
        console.error('error creating shift!')
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.shifts.push(action.payload)
        state.loading = false
        console.log('shift created!')
      })
      .addCase(deleteShift.pending, (state) => {
        state.loading = true
        console.log('deleting shift...')
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to delete shift'
        console.error('error deleting shift!')
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.shifts = state.shifts.filter(
          (shift) => shift.id !== action.payload
        )
        state.loading = false
        console.log('shift deleted!')
      })
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
