import React, { useEffect, useState } from 'react'
import axios from 'axios'

// import React components
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // state
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // load data from server
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('rendered', persons.length, 'persons')

  // modifies state when an input is changed
  const handleQueryChange = event => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }
  const handleNewNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // adds a person object to the list of persons
  const addName = event => {
    event.preventDefault()
    console.log('attempting to add name')

    // check for empty name
    if (newName === '') {
      console.log('empty name was not submitted')
      return
    }

    // check for duplicates
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      console.log(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    // create person object using name and number
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    console.log('new person', newPerson)

    // reset forms
    setNewName('')
    setNewNumber('') // not working; state changes but is not rendered

    // concat person object to list
    setPersons(persons.concat(newPerson))
    console.log('new person added to list', persons, newPerson)
  }

  console.log('rendering with', persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={query}
        handleChange={handleQueryChange}
        text="filter shown with"
      />

      <h2>add a new</h2>
      <PersonForm
        handleSubmission={addName}
        nameValue={newName}
        handleNameChange={handleNewNameChange}
        numebrValue={newNumber}
        handleNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        list={persons}
        filterString={query}
      />
    </div>
  )
}

export default App