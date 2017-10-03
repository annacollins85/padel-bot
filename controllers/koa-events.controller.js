const Event = require('../models/event');

module.exports.getAll = async (ctx) => {
  ctx.body = await Event.getAllEvents();
};
