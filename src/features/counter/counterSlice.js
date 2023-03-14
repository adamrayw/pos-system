import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const counterSLice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        }
    }
})

export const { increment } = counterSLice.actions

export default counterSLice.reducer