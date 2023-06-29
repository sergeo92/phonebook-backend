const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


let persons = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

const date = new Date().toString()

const getRandomId = () => {
	let min = Math.ceil(5)
	let max = Math.floor(15000)

	return Math.floor(Math.random() * (max - min + 1)) + min
}

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/info', (request, response) => {
	response.send(`<p>Phonebook has info for 2 people <br /> <br/>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(p => p.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, resp) => {
	const id =Number( req.params.id)
	persons = persons.filter(p => p.id !== id)
	
	resp.status(204).end()
})

app.post('/api/persons', (req, resp) => {
	const person = req.body;


	if (!person.name){
		return resp.status(400).json({ error: 'name missing'})
	} else if (!person.number) {
		return resp.status(400).json({ error: 'number missing'})
	} else {
		const name = person.name
		const test = persons.find(p => p.name === name)
		if (test) {
			return resp.status(400).json({ error: 'name must be unique'})
		} else {
			person.id = getRandomId()
			persons = persons.concat(person)
			resp.json(person)
		}
	}
})

app.get('/', (request, response) => {
	response.send(`<h1>Phonebook backend<h2>`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server Running on port: ${PORT}`)
})