import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import resultsReducer from './resultsSlice';

const store = configureStore({
    reducer: {
        gameLists: gamesReducer,
        results: resultsReducer,
    },
});

export default store;