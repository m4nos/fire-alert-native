import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  loading: boolean;
}

const initialState: UiState = {
  loading: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action) => state.loading = action.payload
    }

})

export default uiSlice.reducer;