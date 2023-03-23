const express = require('express')
const { v4: generateId } = require('uuid')
const cors = require('cors')
const app = express()

// json parser
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let DUMMY_PRODUCTS = [
	{
		id: 'p1',
		price: 6,
		title: 'The first product',
		description: 'The first product in this store'
	},
	{
		id: 'p2',
		price: 8,
		title: 'The 2nd product',
		description: 'The 2nd product in this store'
	}
]

app.get('/', (req, res) => {
  	res.send('<h1>Hello World!</h1>')
})

app.get('/api/products', (req, res) => {
  	res.json(DUMMY_PRODUCTS)
})

app.get('/api/products/:id', (req, res) => {
	const id = req.params.id
	const product = DUMMY_PRODUCTS.find(product => product.id === id)
	
	if (product) {
		res.json(product)
	} else {
		res.status(404).end()
	}
})

app.delete('/api/products/:id', (req, res) => {
	const id = req.params.id
	DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter(product => product.id !== id)

	res.status(204).end()
})

app.post('/api/products', (req, res) => {
	const body = req.body

	if (!body.title) {
		return response.status(400).json({ 
		  	error: 'title missing' 
		})
	  }
	
	const product = {
		id: generateId(),
		price: body.price,
		title: body.title,
		description: body.description
	}

	DUMMY_PRODUCTS = DUMMY_PRODUCTS.concat(product)
	res.json(product)
})

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})