const db = require('../lib/db');

module.exports = {
  async create(visitor) {
    const [id] = await db('visitor').insert(visitor);
    return id;
  },
  async findById(id) {
    return db('visitor').where({ id }).first();
  },
  async update(id, visitCount) {
    return db('visitor').where({ id }).update({
      visitCount,
      lastVisited: new Date(),
    });
  },
  async getCountByCounterId(counterId) {
    const [result] = await db('visitor').where({ counterId }).count();
    return result[Object.keys(result)[0]];
  },
  async getTotalVisitsByCounterId(counterId) {
    const visitors = await db('visitor').where({ counterId });
    return visitors.reduce((total, { visitCount }) => total + visitCount, 0);
  }
};
