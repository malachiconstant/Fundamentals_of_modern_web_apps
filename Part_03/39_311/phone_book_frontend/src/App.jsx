import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newSearch, handleSearchChange}) => {
  return(
    <div>
      Filter shown with <input type="text" value={newSearch} onChange={handleSearchChange} />
    </div>
    
  )
}

const PersonForm = ({newName, handleNameChange, newNum, handleNumChange, addEntry}) => {
  return(
    <form onSubmit={addEntry}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNum} type="tel" onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const Persons = ({person, deleteEntry}) => {
      return (
      <div key={person.name}>
        {person.name}<br />
        {person.number} <button onClick={deleteEntry}>delete</button><br/><br/>
      </div>
      )
}
const Notification = ({ notification, isError }) => {
   const notificationStyle = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
   }
  if (notification === null || notification === '') {
    return null
  } else {
    return (
      <h2 style={notificationStyle}>{notification}</h2>
    )
  }
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }

    const personMatch = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())

    if(personMatch) {
      let nameText = `${newName} is already added to phonebook. replace the old number with a new one?`
      if(confirm(nameText)) {
        const changedPhone =  {...personMatch, number: newNum}
        
        personService
          .update(personMatch.id, changedPhone)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personMatch.id ? returnedPerson : person))

            setNewName('')
            setNewNum('')
            setNewSearch('')
          }).catch(() => {
            setIsError(true)
            setNotification(`information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setIsError(false)
              setNotification(null)
            }, 5000)
          })
      }

    } else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setNotification(`${newName} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)

        setNewName('')
        setNewNum('')
        setNewSearch('')
      })
    }
    
  }
  const deleteEntry = (id) => {
    const person = persons.find(p => p.id === id)
    const changedObj = persons.filter(e => e !== person)

    let text = `delete ${person.name}?`
    if(confirm(text)) {
      personService
      .remove(person.id)
      .then(() => {
        setPersons(changedObj)
      })
    }

  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const bodyStyle = {
    padding: 30
  }
  return (
    <div style={bodyStyle}>
      <h2>Phonebooks</h2>
      <Notification notification={notification} isError={isError} />
      <Filter  newSearch={newSearch} handleSearchChange={handleSearchChange} /> 
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange} addEntry={addEntry} />
      <h2>Numbers</h2>
      {
        persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person => {
          return (
            <Persons key={person.id} person={person} deleteEntry={() => deleteEntry(person.id)}  />
          )}
        )
      }
    </div>
  )
}

export default App