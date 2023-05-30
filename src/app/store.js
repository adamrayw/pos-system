import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menuSlice/menuSlice'
import modalReducer from '../features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        modal: modalReducer
    }
})