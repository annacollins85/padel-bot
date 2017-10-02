/* eslint-disable no-alert, no-console */
const Sequelize = require('sequelize');

const logging = process.env.ENV !== 'test'
  && process.env.ENV !== 'production';

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging
});

sequelize
  .authenticate()
  .then(() => {
    logging && console.log('Database connection established successfully.');
  })
  .catch(err => {
    logging && console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
