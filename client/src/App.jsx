import { useEffect, useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import './styles/index.css'

// Services
import {
  getAllPersons,
  isAlreadyInDatabase,
  createPerson,
  updatePerson,
  deletePerson
} from './services/persons';

// Components
import Search from './components/Search';
import AddPerson from './components/AddPerson';
import Person from './components/Person';

export default function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAllPersons().then((initialPersons) => setPersons(initialPersons))
  }, [])

  // CONTROLLED INPUTS, HANDLERS AND UTILS

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState({
    success: true,
    message: ''
  });

  const handleChangeName = event => setNewName(event.target.value);
  const handleChangeNumber = event => setNewNumber(event.target.value);
  const handleChangeSearch = event => setSearchText(event.target.value);
  const handleStatus = useCallback(({ success, message }) => setStatus({ success, message }), [])

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
  }

  // CREATE & DELETE PERSONS

  /**
   * Creates a person and saves it in the database and in the application's state. If the person already exists, it will update their number.
   * @param {SubmitEvent} event - the submit event triggered by the creation form.
   */
  const addPerson = useCallback((event) => {
    event.preventDefault();

    if (isAlreadyInDatabase(persons, newName)) {
      if (window.confirm(`${newName} is already on database. Do you want to replace their number?`)) {
        const personToUpdate = persons.find(({ name }) => name === newName)
        const newData = {
          ...personToUpdate,
          number: newNumber
        }
        updatePerson(newData).then((status) => {
          const filteredPersons = persons.filter(({ id }) => id !== newData.id);
          handleStatus({
            success: true, message: `${newData.name} updated successfully.`
          })
          setPersons([...filteredPersons, newData])
          resetFields();
        }).catch((error) => handleStatus({
          success: false,
          message: `${newData.name} was not found. | ${error.code}`
        }))
      }
    } else {
      const personObject = {
        id: nanoid(),
        name: newName,
        number: newNumber
      }

      createPerson(personObject).then((status) => {
        handleStatus({
          success: true,
          message: `${personObject.name} created successfully.`
        })
        setPersons([...persons, personObject])
        resetFields()
      })
    }
  }, [newName, newNumber, persons, handleStatus])

  /**
   * Removes a person from the database and the application's state,
   * @param {string} id - The ID of the person to remove.
   */
  const removePerson = useCallback((id) => {
    const thisPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${thisPerson.name}?`)) {
      deletePerson(id).then((status) => {
        const newPersons = persons.filter(({ id: personId }) => personId !== id)
        handleStatus({
          success: true,
          message: `${thisPerson.name} deleted successfully.`
        })
        setPersons(newPersons);
      }).catch((error) => handleStatus({
        success: false,
        message: `The attempt to remove ${thisPerson.name} was unsuccessfull. | ${error.code}`
      }))
    }
  }, [persons, handleStatus])


  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Filter</h3>
      <Search query={searchText} handler={handleChangeSearch} />

      <h3>Add a new contact</h3>
      <AddPerson
        name={newName}
        number={newNumber}
        handleName={handleChangeName}
        handleNumber={handleChangeNumber}
        handleSubmit={addPerson}
      />

      <p style={{ display: status.message ? 'block' : 'none' }} className={`status-message ${status.success ? 'success' : 'failed'}`}>{status.message}</p>

      <ul>
        {persons.filter(({ name }) => name.toLocaleLowerCase().includes(searchText)).map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleDelete={() => removePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  )
}