const Event = require('../../models/event');

module.exports.getAllEvents = async (ctx) => {
  ctx.body = await Event.getAllEvents();
};
