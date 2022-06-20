const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

morgan.token('content', function (request) {
  return JSON.stringify(request.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan((tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.content(request, response),
  ].join(' ')
}))

// Default values

let persons = [
  {
    id: 0,
    name: 'Humberto',
    number: '+54 9 329 9327394'
  },
  {
    id: 1,
    name: 'Franco',
    number: '+54 9 283 6326329'
  },
  {
    id: 2,
    name: 'Pedro',
    number: '+54 9 744 8287274'
  }
]

// Routes

app.get('/info', (request, response) => {
  response.send(`
    <div>
      <p>Phonebook has info about ${persons.length} people</p>
      <p>${new Date().toTimeString()}</p>
    </div>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
  const requestId = Number(request.params.id);
  const person = persons.find((person) => person.id === requestId);
  response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
  const requestId = Number(request.params.id);
  persons = persons.filter((person) => person.id !== requestId);
  response.status(204).json({ status: `successfully deleted person of ID ${requestId}` });
})

const isListed = (name) => persons.map((person) => person.name).includes(name);
const generateId = () => persons.length > 0
  ? Math.max(...persons.map((note) => note.id)) + 1
  : 0

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) return response.status(400).json({ error: 'Name is missing' })
  if (!body.number) return response.status(400).json({ error: 'Number is missing' })
  if (isListed(body.name)) return response.status(400).json({ error: 'That name is already listed' })
  if (!body) return response.status(400).json({ error: 'Body is empty' })

  const personObject = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = [...persons, personObject]
  response.json(personObject);
})

const PORT = process.env.PORT || 3001;

app.use(express.static('build'))

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})