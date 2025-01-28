require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('postBody', (req) => {
  if (req.method === 'POST') {
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
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(persons => {
    if(persons) {
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// POST NEW
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number
  })
  newPerson.save().then(() => {
    response.json(newPerson)
  }).catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//UPDATE
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }
// app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})