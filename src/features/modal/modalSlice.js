import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        value: []
    },
    reducers: {
        addModalData: (state, action) => {
            state.value = [];
            state.value.push(action.payload);
        },
    }
});

export const { addModalData } = modalSlice.actions;
export default modalSlice.reducer;