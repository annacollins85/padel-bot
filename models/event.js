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
  },
  allDay: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});
// Event.sync({force: true});

/* The list feature is not used for the moment */
// module.exports.getEvents = async () => {
//   try {
//     return await Event.findAll();
//   } catch (error) {
//     Console.error(error);
//   }
// };

Event.getNextEvent = async () => {
  try {
    return await Event.findOne({ order: [ ['date', 'ASC']]});
  } catch (error) {
    Console.error(error);
  }
};

Event.createEvent = async (info, date, allDay) => {
  try {
    return await Event.create({info, date, allDay});
  } catch (error) {
    Console.error(error);
  }
};

Event.deleteEvent = async (info) => {
  try {
    return await Event.destroy({ where: { info: info } });
  } catch (error) {
    Console.error(error);
  }
};

Event.updateAttendees = async (data) => {
  try {
    return await Event.update({ attendees: data[1].text }, { where: { info: data[0].text} });
  } catch (error) {
    Console.error(error);
  }
};


//Functions for Koa server to add dummy data to the db without using slack and localtunnel
//Used for developing the front end
Event.getAllEvents = () => {
  try {
    return Event.findAll({});
  } catch (error) {
    Console.error(error);
  }
};

Event.postEvent = async (info, date, attendees, allDay) => {
  try {
    return await Event.create({info, date, attendees, allDay});
  } catch (error) {
    Console.error(error);
  }
};

module.exports = Event;
