const express = require('express')
const app = express()
const morgan = require('morgan')
let persons = require('./persons.json')

app.use(express.json())

morgan.token('postBody', (req,res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

app.get('/', (request, response) => {
  response.send('<h1>you are home</h1>')
})

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(`<p>PhoneBook has info for ${persons.length} people<br/>${Date(Date.now())}</p>`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const nameResult = persons.filter(person => body.name === person.name)
  if (nameResult.length > 0) {
        return response.status(400).json({ 
      error: 'name already exists'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: `${Math.floor(Math.random() * 100000)}`,
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
  
  
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})