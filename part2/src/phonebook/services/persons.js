import axios from 'axios';

const PORT = '3001'
const BASE_URL = `http://localhost:${PORT}/api/persons`

export const getAllPersons = () => axios.get(BASE_URL).then((response) => response.data);

export const isAlreadyInDatabase = (currentPersons, name) => {
  const currentNames = currentPersons.map((person) => person.name);
  if (currentNames.includes(name)) return true;

  return false;
}

export const createPerson = async (data) => {
  const { id, name, number } = data;
  const personObject = { id, name, number }

  return axios.post(BASE_URL, personObject).then((response) => response.status);
}

export const deletePerson = (id) => axios.delete(`${BASE_URL}/${id}`).then((response) => response.status);

export const updatePerson = async (data) => {
  const { id, name, number } = data;
  return axios.put(`${BASE_URL}/${id}`, { id, name, number }).then((response) => response.status);
}