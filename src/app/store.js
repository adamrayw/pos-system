import { configureStore } from "@reduxjs/toolkit";
import menuReducer from '../features/menuSlice/menuSlice'
import modalReducer from '../features/modal/modalSlice'
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        menu: menuReducer,
        modal: modalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})