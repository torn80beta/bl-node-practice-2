const express = require('express');
const path = require('path');
const connectDb = require('../config/connectDb');
require('colors');
const errorHandler = require('./middlewares/errorHandler');

const configPath = path.join(__dirname, '..', 'config', '.env');
require('dotenv').config({ path: configPath });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', require('./routes/carsRoutes'));

app.use(errorHandler);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.green.bold.italic);
});
