const express = require('express');
const carsRouter = express.Router();
const carsController = require('../controllers/Cars');
const rolesMiddleware = require('../middlewares/rolesMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

carsRouter.post(
  '/cars',
  (req, res, next) => {
    console.log('Joi has been triggered');
    next();
  },
  authMiddleware,
  carsController.addCar
);

carsRouter.get(
  '/cars',
  authMiddleware,
  // rolesMiddleware(['MODERATOR', 'ADMIN', 'CUSTOMER']),
  carsController.getAll
);
// "USER", "COURIER", "EDITOR"

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
