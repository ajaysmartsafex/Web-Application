import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameResults: [], // Store all results
    selectedResult: null // Store a selected result for viewing or editing
}

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        setGameResults: (state, action) => {
            state.gameResults = action.payload; // Set all results
        },
        setSelectedResult: (state, action) => {
            state.selectedResult = action.payload; // Store a single result
        }
    }
});

export const { setGameResults, setSelectedResult } = resultsSlice.actions;

export default resultsSlice.reducer;