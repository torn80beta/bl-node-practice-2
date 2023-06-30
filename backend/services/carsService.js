const carsModel = require('../models/carsModel');

class CarsService {
  async getAll() {
    const cars = carsModel.find({});
    if (!cars) {
      return null;
    }
    return cars;
  }

  async add(data) {
    const car = await carsModel.create({ ...data });
    if (!car) {
      return null;
    }
    return car;
  }
}

module.exports = new CarsService();
