const db = require('../lib/db');

module.exports = {
  async create(counter) {
    const [id] = await db('counter').insert(counter);
    return id;
  },
  async findById(id) {
    return db('counter').where({ id }).first();
  },
  async findByGuid(guid) {
    return db('counter').where({ guid }).first();
  }
};
