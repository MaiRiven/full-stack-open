import { useState, useEffect } from 'react'
import Heading from './components/Heading'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personServices from './Services/PersonServices'
import PersonForm from './components/PersonForm'
import Button from './components/Button'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [changeMessage, setChangeMessage] = useState('')


  useEffect(() => {
    personServices
      .getAll()
      .then(initialResult => {
        setPersons(initialResult)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const checkName = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
    const changedPerson = { ...checkName, number: newNumber }

    if (checkName && checkName.number !== newPerson.number) {
      window.alert(`${newName} is already in the phonebook`)
    }
    else if (checkName && checkName.number !== newPerson.number) {
      if (window.confirm(`${newName} is already in the phonebook. Update the number?`)) {
        personServices
          .updatePerson(checkName.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !== checkName.id ? n : returnedPerson))
            setNewName("")
            setNewNumber("")
            setTimeout(() => {
              setChangeMessage(`number of ${newName} has been changed`)
            }, 3000)
          })
          .catch(error => {
            setChangeMessage(`Information of ${newName} has already been removed`)
          })
      }
    }
    else {
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
      setTimeout(() => {
        setChangeMessage(`Added ${newName}`)
      }, 3000)
    }
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personServices
        .getDeletedPerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNewName = (event) => { setNewName(event.target.value) }
  const handleNewNumber = (event) => { setNewNumber(event.target.value) }
  const handleNewFilter = (event) => { setFilterName(event.target.value) }

  // const filteredPersons = filterName ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLocaleLowerCase())
  // )
  //   : persons;

  // const People = ({ name, number, id }) => {
  //   return (<li>{name} {number}{' '} <Button text='delete' type='submit' handleNewChange={() => deletePerson(id)} /></li>)
  // }

  // const personAfterFilter = filteredPersons.map(person => (
  //   <People key={person.id} name={person.name} number={person.number} id={person.id} />
  // ));

  const Persons = ({ persons }) => {
    return (
      <ul>
        {persons.map(person => (
          <li key={person.id}>{person.name} {person.number}
          </li>
        ))}
      </ul>)
  }

  return (
    <div>
      <Heading text='Phonebook' />
      <Notification message={changeMessage} />
      <Filter text='filter shown with' value={filterName} handleNewChange={handleNewFilter} />
      <Heading text='add a new' />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber} />
      <Heading text='Numbers' />
      {/* <Persons personAfterFilter={personAfterFilter} /> */}
      <Persons persons={persons} />
    </div>
  )
}

export default App