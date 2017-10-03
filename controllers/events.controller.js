const eventsSerializer = require('../serializers/events.serializer');
const Event = require('../models/event');
const Strings = require('../utils/strings');

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
    const event = await this.Event.createEvent(name);
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
  }s

}

module.exports = EventsController;
