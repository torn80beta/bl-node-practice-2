const express = require('express');
const carsRouter = express.Router();
const carsController = require('../controllers/Cars');

carsRouter.post(
  '/cars',
  (req, res, next) => {
    console.log('Joi has been triggered');
    next();
  },
  carsController.addCar
);

carsRouter.get('/cars', carsController.getAll);

carsRouter.get('/cars/:id', carsController.getById);

carsRouter.put('/cars/:id', carsController.updateCar);

carsRouter.delete('/cars/:id', carsController.removeCar);

// /cars
// addCar
// getAll
// getById
// updateCar
// removeCar

module.exports = carsRouter;
