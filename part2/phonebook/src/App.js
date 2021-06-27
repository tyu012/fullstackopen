import React, { useEffect, useState } from 'react'

// import React components
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  // state
  const [persons, setPersons] = useState([])
  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // Message example:
  // { text: "Text", successful: true }
  const [message, setMessage] = useState(null)

  // reset form
  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  // load data from server
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)
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

    // create person object using name and number
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    console.log('new person', newPerson)

    // check for duplicates, prompts for replacement if duplicate found
    const matchResult = persons.find(person => person.name === newName)
    console.log('found match:', matchResult)

    if (matchResult !== undefined
      && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

      personService
        .update(matchResult.id, newPerson)
        .then(updatedPerson => {
          console.log('updated person', updatedPerson)
          // update the array with the replaced person
          setPersons(persons.map(person => {
            return person.id === updatedPerson.id ? updatedPerson : person
          }))
          // reset forms
          resetForm()
        })
        // handle updating of entries that do not exist
        .catch(error => {
          setPersons(persons.filter(person => {
            return person.id !== matchResult.id
          }))
          setMessage({
            text: `Information of ${matchResult.name} has already been removed from server`,
            successful: false
          })
          setTimeout(() => setMessage(null), 5000)
        })

      setMessage({ text: `Updated ${newName}`, successful: true })
      setTimeout(() => setMessage(null), 5000)

    } else {

      // save data to server
      personService
        .create(newPerson)
        .then(person => {
          // concat person object to list
          setPersons(persons.concat(person))
          // reset forms
          resetForm()
          console.log('new person added to list', persons, newPerson)
        })

      setMessage({ text: `Added ${newName}`, successful: true })
      setTimeout(() => setMessage(null), 5000)

    }
  }

  // creates a function that deletes a specified person object upon confirmation
  const deletePerson = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        personService
          .deleteUsingObject(person)
          .then(data => {
            // remove person from display
            setPersons(persons.filter(p => p !== person))
            // show message
            setMessage({ text: `Deleted ${person.name}`, successful: true })
            setTimeout(() => setMessage(null), 5000)
          })
      }
    }
  }

  console.log('rendering with', persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
        handleDelete={deletePerson}
      />
    </div>
  )
}

export default App