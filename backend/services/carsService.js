const carsModel = require('../models/carsModel');

class CarsService {
  async getAll(id) {
    const cars = carsModel.find({ owner: id });
    if (!cars) {
      return null;
    }
    return cars;
  }

  async add(data, id) {
    const car = await carsModel.create({ ...data, owner: id });
    if (!car) {
      return null;
    }
    return car;
  }
}

module.exports = new CarsService();
