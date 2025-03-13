import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice';
import resultsReducer from './resultsSlice';

const store = configureStore({
    reducer: {
        gameLists: gamesReducer,
        results: resultsReducer,
    },
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
});

export default store;