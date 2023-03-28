const productRouter = require('express').Router()
const Product = require('../models/product')
const { v4: generateId } = require('uuid')

productRouter.get('/', (req, res) => {
	Product.find({}).then(products => {
		res.json(products)
	})
})

productRouter.get('/:id', (req, res, next) => {
	Product.findById(req.params.id)
	.then(product => {
		if (product) {
			res.json(product)
		} else {
			res.status(404).end()
		}
	})
	.catch(error => next(error))
})

productRouter.delete('/:id', (req, res, next) => {
	Product.findByIdAndRemove(req.params.id)
	.then(result => {
		res.status(204).end()
	})
	.catch(error => next(error))
})

productRouter.post('/', (req, res, next) => {
	const body = req.body
  
	if (body.title === undefined) {
	  	return res.status(400).json({ error: 'Title missing' })
	}
  
	const product = new Product({
		id: generateId(),
		price: body.price,
		title: body.title,
		description: body.description
	})
  
	product.save()
	.then(savedProduct => {
	  	res.json(savedProduct)
	})
	.catch(error => next(error))
})

productRouter.put('/:id', (req, res, next) => {
	const { title, price, description } = req.body
  
	Product.findByIdAndUpdate(
		req.params.id, 
		{ title, price, description },
    	{ new: true, runValidators: true, context: 'query' }
	)
	.then(updatedProduct => {
		res.json(updatedProduct)
	})
	.catch(error => next(error))
})

module.exports = productRouter