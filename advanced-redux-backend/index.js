require('dotenv').config()
const express = require('express')
const { v4: generateId } = require('uuid')
const cors = require('cors')
const app = express()

const Product = require('./models/product')
  
// json parser
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// app.get('/', (req, res) => {
//   	res.send('<h1>Hello World!</h1>')
// })

app.get('/api/products', (req, res) => {
	Product.find({}).then(products => {
		res.json(products)
	})
})

app.get('/api/products/:id', (req, res, next) => {
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

app.delete('/api/products/:id', (req, res, next) => {
	Product.findByIdAndRemove(req.params.id)
	.then(result => {
		res.status(204).end()
	})
	.catch(error => next(error))
})

app.post('/api/products', (req, res) => {
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
  
	product.save().then(savedProduct => {
	  	res.json(savedProduct)
	})
})

app.put('/api/products/:id', (req, res, next) => {
	const body = req.body
  
	const product = {
	  title: body.title,
	  price: body.price,
	  description: body.description
	}
  
	Product.findByIdAndUpdate(req.params.id, product, { new: true })
	  .then(updatedProduct => {
		res.json(updatedProduct)
	  })
	  .catch(error => next(error))
  })

const errorHandler = (error, req, res, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
	  	return res.status(400).send({ error: 'malformatted id' })
	}
  
	next(error)
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

// error handling after registering other middlewares!
app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  	console.log(`Server running on port ${PORT}`)
})