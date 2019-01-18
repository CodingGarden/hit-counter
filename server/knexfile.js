module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'hit-counter',
      user: 'root',
      password: 'codinggarden'
    },
  },
  production: {
    client: 'mysql',
    connection: process.env.DATABASE_URL,
  }
};
