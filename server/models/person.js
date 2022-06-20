require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('Connecting to MongoDB Atlas:', url);

mongoose.connect(url)
  .then(() => console.log('Connected successfully'))
  .catch((error) => console.log('There was an error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 30,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    maxLength: 50,
    unique: true,
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
