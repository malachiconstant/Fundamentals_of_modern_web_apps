require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('postBody', (req,res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))

// HOME
app.get('/', (request, response) => {
  response.send('<h1>you are home</h1>')
})

// GET ALL
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// GET ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id).then(persons => {
    response.json(persons)
  })
})

// POST NEW
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save().then(savedPerson => {
    response.json(newPerson)
  })
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    // .catch(error => next(error))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})