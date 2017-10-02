const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const Console = console;

const Event = sequelize.define('event', {
  info: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  attendees: {
    type: Sequelize.STRING
  }
});
Event.sync({force: true});

/* The list feature is not used for the moment */
// module.exports.getEvents = async () => {
//   try {
//     return await Event.findAll();
//   } catch (error) {
//     Console.error(error);
//   }
// };

module.exports.getNextEvent = async () => {
  try {
    return await Event.findOne({ order: [ ['date', 'ASC']]});
  } catch (error) {
    Console.error(error);
  }
};

module.exports.createEvent = async (info) => {
  const date = new Date();
  try {
    return await Event.create({info: info, date});
  } catch (error) {
    Console.error(error);
  }
};

module.exports.deleteEvent = async (info) => {
  try {
    console.log('info', info);
    return await Event.destroy({ where: { info: info } });
  } catch (error) {
    Console.error(error);
  }
};

module.exports.updateAttendees = async (info, attendees) => {
  try {
    return await Event.update({ attendees: attendees }, { where: { info: info,  } });
  } catch (error) {
    Console.error(error)
  }
};
