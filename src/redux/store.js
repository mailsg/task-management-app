import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './tasks/slice/tasksSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store;