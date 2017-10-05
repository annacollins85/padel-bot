/* eslint-disable no-alert, no-console */
const Sequelize = require('sequelize');
const sequelize = require('../utils/db');

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
//     console.error(error);
//   }
// };

Event.getNextEvent = async () => {
  try {
    return await Event.findOne({ order: [ ['date', 'ASC']]});
  } catch (error) {
    console.error(error);
  }
};

Event.createEvent = async (info, date, allDay) => {
  try {
    return await Event.create({info, date, allDay});
  } catch (error) {
    console.error(error);
  }
};

Event.deleteEvent = async (info) => {
  try {
    return await Event.destroy({ where: { info: info } });
  } catch (error) {
    console.error(error);
  }
};

Event.updateAttendees = async (data) => {
  try {
    const attendees = data[1]
      ? data[1].text
      : '';
    return await Event.update({ attendees }, { where: { info: data[0].text } });
  } catch (error) {
    console.error(error);
  }
};

Event.getAllEvents = () => {
  try {
    return Event.findAll({});
  } catch (error) {
    console.error(error);
  }
};

module.exports = Event;
