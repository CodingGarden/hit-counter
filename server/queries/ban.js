const db = require('../lib/db');

module.exports = {
  async find(ip, counterId) {
    return db('ban').where({ ip, counterId }).first();
  }
};
