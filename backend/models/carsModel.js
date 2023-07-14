const { Schema, model } = require('mongoose');

const carsSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'DB: brand is required'],
  },
  model: {
    type: String,
    required: [true, 'DB: model is required'],
  },
  year: {
    type: Number,
    default: 2000,
  },
  engine: {
    type: String,
    default: 'electric',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('cars', carsSchema);
