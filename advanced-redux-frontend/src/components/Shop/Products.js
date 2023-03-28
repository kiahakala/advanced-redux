import { useState, useEffect } from 'react'
import productService from '../../services/products'
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		productService
		.getAll()
		.then(initialProducts => {
			setProducts(initialProducts)
      })
	  	}, [])
	console.log('render', products.length, 'products')

	return (
		<section className={classes.products}>
		<h2>Available products</h2>
		<ul>
			{products.map(product =>
			<ProductItem
				key={product.id}
				id={product.id}
				title={product.title}
				price={Number(product.price)}
				description={product.description}
			/>
			)}
		</ul>
		</section>
	);
};

export default Products;
