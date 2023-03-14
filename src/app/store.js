import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice'
import menuReducer from '../features/menuSlice/menuSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        menu: menuReducer
    }
})