import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: { 
		cartIsVisible: false,
		productFormIsVisible: false
	},
	reducers: {
		toggleCart(state) {
			state.cartIsVisible = !state.cartIsVisible
		},
		toggleProductForm(state) {
			state.productFormIsVisible = !state.productFormIsVisible
		}
	}
})

export const uiActions = uiSlice.actions

export default uiSlice