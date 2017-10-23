const eventsSerializer = require('../serializers/events.serializer');
const Event = require('../models/event');
const Strings = require('../utils/strings');

const moment = require('moment');

class EventsController {

  constructor () {
    this.Event = Event;
    this.eventsSerializer = eventsSerializer;
  }

  //functions for botKit
  async processMessage (eventInfo) {
    const event = this.eventsSerializer.parseEvent(eventInfo);
    switch (event.action) {
      case 'create':
        return await this.createEvent(event.params);
      // case 'list':
      //   return await this.listEvents();
      case 'next':
        return await this.getNextEvent();
      case 'delete':
        return await this.deleteEvent(event.params[0]);
      default:
        return Strings.INVALID_COMMAND;
    }
  }

  async createEvent (name) {
    if (
      typeof name !== 'string'
      || name === ''
      || !name
      || name === false
    ) {
      return false;
    }

    const matches = name.match(/(\d\d\/\d\d\/\d\d\d\d)[\s]?(\d\d:\d\d)?/);
    let date;
    let allDay = true;
    if (matches && matches.length > 0) {
      date = matches[0];
      name = name.substring(0, matches.index).trim();
      allDay = matches[2] === undefined;
      date = moment(date, 'DD/MM/YYYY HH:mm').toDate();
    }
    const timeFormat = allDay ? '' : ', h:mm a';
    const calendarTime = date
      ? ' – ' + moment(date).format(`MMM Do${timeFormat}`)
      : '';
    const eventInfo = name + calendarTime;

    const event = await this.Event.createEvent(eventInfo, date, allDay);
    return await this.eventsSerializer.formatNewEvent(event.dataValues);
  }

  /* The list feature is WIP */
  // async listEvents () {
  //   const eventList = await this.Event.getEvents();
  //   return this.eventsSerializer.formatEventList(eventList);
  // }

  async getNextEvent () {
    const nextEvent = await this.Event.getNextEvent();
    return this.eventsSerializer.formatNewEvent(nextEvent.dataValues);
  }

  async updateAttendees (data) {
    return await this.Event.updateAttendees(data);
  }

  async deleteEvent (name) {
    return (await this.Event.deleteEvent(name) !== 0) ? `Event ${name} deleted` : 'Event not found';
  }

}

module.exports = EventsController;
