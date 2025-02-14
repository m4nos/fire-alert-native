import { createSlice } from '@reduxjs/toolkit'
import { Shift } from './shifts.types'
import { createShift, fetchShifts } from './shifts.thunk'

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
      })
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
