const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}




const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url = 'mongodb+srv://manalojp:' + password + '@cluster0.8h8lh.mongodb.net/personApp?retryWrites=true&w=majority'

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: phone,
})

if (process.argv.length > 3) {
  person.save().then(() => {
    console.log(`added ${name} ${phone}`)
    mongoose.connection.close()
  })
} else {
  Person.find().then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

