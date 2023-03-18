import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    subTotal: 0
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        add: (state, action) => {
            const itemIndex = state.value.findIndex((item) => item.id === action.payload.id)

            if (itemIndex >= 0) {
                state.value[itemIndex].qty += 1
            } else {
                const tempItem = { ...action.payload, qty: action.payload.qty }
                state.value.push(tempItem)
            }
        },
        remove: (state, action) => {
            const itemIndex = state.value.findIndex((e) => e.id === action.payload.id)

            if (itemIndex >= 0) {
                if (state.value[itemIndex].qty > 1) {
                    state.value[itemIndex].qty -= 1;
                } else if (state.value[itemIndex].qty === 1) {
                    state.value.splice(itemIndex, 1);
                }
            }
        },
        getSubTotal: (state, action) => {
            let { subTotal, quantity } = state.value.reduce((cartSubtotal, cartItem) => {
                const { price, qty } = cartItem
                const itemTotal = Number(price) * Number(qty)

                cartSubtotal.subTotal += itemTotal
                cartSubtotal.quantity += Number(qty)

                return cartSubtotal
            }, {
                subTotal: 0,
                qty: 0
            })
            state.subTotal = subTotal
            state.qty = quantity
        }
    }
})

export const { add, remove, getSubTotal } = menuSlice.actions

export default menuSlice.reducer