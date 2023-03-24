import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    subTotal: 0,
    tab: 'semua',
    keyword: '',
    transaction_today: [],
    transaction_month: [],
    total_pendapatan_today: 0,
    total_pendapatan_month: 0,
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
        },
        kategoriIndex: (state, action) => {
            state.tab = action.payload
        },
        setKeyword: (state, action) => {
            state.keyword = action.payload
        },
        calculateTrToday: (state, action) => {
            state.transaction_today = action.payload

            if (state.transaction_today.length !== 0) {
                const total = state.transaction_today.reduce((acc, transaction_today) => acc + transaction_today.total, 0)
                state.total_pendapatan_today = total
            }
        },
        calculateTrMonth: (state, action) => {
            state.transaction_month = action.payload

            if (state.transaction_month.length !== 0) {
                const total = state.transaction_month.reduce((acc, transaction_month) => acc + transaction_month.total, 0)
                state.total_pendapatan_month = total
            }
        },
        reset: (state) => {
            state.value = []
            state.subTotal = 0
        }
    }
})

export const { add, remove, getSubTotal, kategoriIndex, setKeyword, calculateTrToday, calculateTrMonth, reset } = menuSlice.actions

export default menuSlice.reducer