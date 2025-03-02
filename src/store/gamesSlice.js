import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameData: [], // Store all games
    selectedGame: null // Store a selected game for viewing or editing
};

const gamesSlice = createSlice({
    name: 'gameLists',
    initialState,
    reducers: {
        setGameDate: (state, action) => {
            state.gameData = action.payload;
        },
        setSelectedGame: (state, action) => {
            state.selectedGame = action.payload;
        }
    }
});

export const { setGameDate, setSelectedGame } = gamesSlice.actions;

export default gamesSlice.reducer;
