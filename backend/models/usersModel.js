const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  name: {
    type: String,
    default: 'Sundra Bulloc',
  },
  email: {
    type: String,
    required: [true, 'DB: email is required'],
  },
  password: {
    type: String,
    required: [true, 'DB: password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: 'roles',
    },
  ],
});

module.exports = model('users', usersSchema);
