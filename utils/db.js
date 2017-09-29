const Sequelize = require('sequelize');
const Console = console;

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    Console.log('Database connection established successfully.');
  })
  .catch(err => {
    Console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
