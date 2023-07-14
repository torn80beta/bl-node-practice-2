const carsModel = require('../models/carsModel');
const asyncHandler = require('express-async-handler');
const carsService = require('../services/carsService');

class Cars {
  //   addCar = async (req, res) => {
  //     const car = await carsModel.create({ ...req.body });
  //     res.status(201).json({
  //       code: 201,
  //       message: 'success',
  //       data: car,
  //     });
  //   };

  //   addCar = asyncHandler(async (req, res) => {
  //     const { brand, model } = req.body;

  //     if (!brand || !model) {
  //       res.status(400);
  //       throw new Error('Provide all required fields!');
  //     }
  //     const car = await carsModel.create({ ...req.body });
  //     if (!car) {
  //       res.status(400);
  //       throw new Error('Unable to save to DB :(');
  //     }
  //     res.status(201).json({
  //       code: 201,
  //       message: 'success',
  //       data: car,
  //     });
  //   });

  addCar = asyncHandler(async (req, res) => {
    const { brand, model } = req.body;
    const userId = req.user.id;
    if (!brand || !model) {
      res.status(400);
      throw new Error('Provide all required fields!');
    }
    const car = await carsService.add(req.body, userId);
    if (!car) {
      res.status(400);
      throw new Error('Unable to save to DB :(');
    }
    res.status(201).json({
      code: 201,
      message: 'success',
      data: car,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const result = await carsService.getAll(id);
    if (!result) {
      res.status(400);
      throw new Error('Unable to fetch cars :(');
    }
    res.status(200).json({
      code: 200,
      data: result,
      message: 'success',
      qty: result.length,
    });
  });

  getById = (req, res) => {
    res.send('getById');
  };

  updateCar = (req, res) => {
    res.send('updateCar');
  };

  removeCar = (req, res) => {
    res.send('removeCar');
  };
}

module.exports = new Cars();
