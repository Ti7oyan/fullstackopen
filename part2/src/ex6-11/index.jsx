import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import Search from './Search';
import AddPerson from './AddPerson';
import Person from './Person';
import axios from 'axios';

export default function App() {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('');

  const handleChangeName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  }

  const handleChangeNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  }

  const resetFields = () => {
    setNewName('');
    setNewNumber('');
  }

  const addPerson = (event) => {
    event.preventDefault();

    const currentNames = persons.map((person) => person.name);
    if (currentNames.includes(newName)) return alert(`${newName} is already on the list.`)

    const personObject = {
      id: nanoid(),
      name: newName,
      number: newNumber,
    }

    axios.post('http://localhost:3001/persons', personObject);
    setPersons([...persons, personObject])
    resetFields();
  }

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  }

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

      <ul>
        {persons.filter(({ name }) => name.toLocaleLowerCase().includes(searchText)).map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  )
}