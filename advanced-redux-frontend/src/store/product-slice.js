import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
	name: 'product',
	initialState: {
		products: [],
	},
	reducers: {
		addProduct(state, action) {
			const newProduct = action.payload
			const existingProduct = state.products.find(product => product.id === newProduct.id)
			if (!existingProduct) {
				state.products.push({
					id: newProduct.id,
					price: newProduct.price,
					title: newProduct.title,
					description: newProduct.description
				})
			} else {
				existingProduct.price = newProduct.price
				existingProduct.title = newProduct.title
				existingProduct.description = newProduct.description
			}
		},
		removeProduct(state, action) {
			const id = action.payload
			const existingProduct = state.items.find(product => product.id === id)
			state.products = state.products.filter(product => product.id !== id)
		}
	}
})

export const productActions = productSlice.actions

export default productSlice