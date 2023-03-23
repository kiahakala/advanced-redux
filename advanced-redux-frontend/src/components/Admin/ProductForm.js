import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import productService from '../../services/products'
import { productActions } from '../../store/product-slice'

const ProductForm = () => {

	//const dispatch = useDispatch()

	const [products, setProducts] = useState([])
	const [newProduct, setNewProduct] = useState({
		title: '',
		price: 0,
		description: ''
	})

	//const products = useSelector(state => state.product.products)

	const handleInputChange = (event) => {
		const value = event.target.value
		setNewProduct({
			...newProduct,
			[event.target.name]: value
		})
	}

	const addNewProduct = (event) => {
		event.preventDefault()
		const productObject = {
			id: newProduct.title.length + Math.random().toString(),
			title: newProduct.title,
			price: newProduct.price,
			description: newProduct.description
		}
		// dispatch(
		// 	productActions.addProduct({
		// 		id: newTitle.length + Math.random().toString(),
		// 		title: newTitle,
		// 		price: newPrice,
		// 		description: newDescription
		// 	})
		// )
		productService
      		.create(productObject)
      		.then(returnedProduct => {
        		setProducts(products.concat(returnedProduct))
				setNewProduct({
					title: '',
					price: 0,
					description: ''
			})
      	})
		
	}

	// const editProduct = id => {
	// 	const product = products.find(n => n.id === id)
	// 	const changedProduct = { ...product, title: newProduct.title }

	// 	productService
	// 	.update(id, changedProduct)
	// 		.then(returnedProduct => {
	// 			setProducts(products.map(product => product.id !== id ? product : returnedProduct))
	// 	})
	// 	.catch(error => {
	// 		alert(
	// 		`Could not find product '${product.title}'`
	// 		)
	// 		setProducts(products.filter(p => p.id !== id))
	// 	})
	// }

	return (
		<form onSubmit={addNewProduct}>
        	<input 
				name='title' 
				type='text' 
				value={newProduct.title} 
				onChange={handleInputChange} 
			/>
			<input 
				name='price'
				type='number'
				value={newProduct.price} 
				onChange={handleInputChange} 
			/>
			<input 
				name='description'
				type='text'
				value={newProduct.description} 
				onChange={handleInputChange} 
			/>
       		<button type="submit">Save</button>
      	</form> 
	)
}

export default ProductForm