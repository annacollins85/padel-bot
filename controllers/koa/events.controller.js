const Event = require('../../models/event');

module.exports.getAllEvents = async (ctx) => {
  ctx.body = await Event.getAllEvents();
};

module.exports.postEvent = async (ctx) => {
  let info = ctx.request.body.info;
  let date = ctx.request.body.date;
  let attendees = ctx.request.body.attendees;
  let allDay = ctx.request.body.allDay;
  await Event.postEvent(info, date, attendees, allDay);
  ctx.status = 201;
};

module.exports.markPaid = async (ctx) => {
  let attendee = ctx.request.body.attendee;
  await Event.markPaid(attendee);
};
