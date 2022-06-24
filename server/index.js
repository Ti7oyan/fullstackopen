require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

// Morgan configuration

morgan.token('content', (request) => JSON.stringify(request.body));

app.use(morgan((tokens, request, response) => [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  tokens.content(request, response),
].join(' ')));

// Routes

app.get('/info', (request, response) => {
  const personsLength = Person.find({}).then((persons) => persons.length);

  response.send(`
    <div>
      <p>Phonebook has info about ${personsLength} people</p>
      <p>${new Date().toTimeString()}</p>
    </div>
  `);
});

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((persons) => {
      response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then((person) => {
      if (!person) response.status(404).end();
      response.json(person);
    })
    .catch((error) => response.status(400).send({ error }));
});

app.delete('/api/persons/:id', (request, response) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(() => response.status(204).send({ status: `Successfully deleted person with ID of ${request.params.id}` }))
    .catch((error) => response.status(400).send({ error }));
});

const isListed = (name) => {
  Person
    .findOne({ name });
};

app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body;
  Person
    .findByIdAndUpdate(
      request.params.id,
      { name, number },
      { runValidators: true, context: 'query' },
    )
    .then(() => response.json({ status: `Successfully updated person with ID of ${request.params.id}` }))
    .catch((error) => response.status(400).send({ error }));
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (isListed(name)) return response.status(400).send({ error: 'That name is already listed.' });

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => response.status(400).send({ error }));

  return newPerson;
});

const unknownEndpoint = (request, response) => response.status(404).send({ error: 'Unknown endpoint' });

app.use(unknownEndpoint);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
