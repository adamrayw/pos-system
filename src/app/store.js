import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menuSlice/menuSlice'

export const store = configureStore({
    reducer: {
        menu: menuReducer
    }
})