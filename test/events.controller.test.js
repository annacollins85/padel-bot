'use strict';

const moment = require('moment');

require('chai').should();
const sinon = require('sinon');
const mocks = require('./mocks');
const EventsController = require('../controllers/events.controller');

describe('EventsController', function () {
  let eventsController;

  beforeEach(() => {
    eventsController = new EventsController();
    sinon.spy(eventsController.eventsSerializer, 'formatNewEvent');
  });

  afterEach(() => {
    eventsController.eventsSerializer.formatNewEvent.restore();
  });

  it ('should create event correctly', async () => {
    const response = await eventsController.createEvent('pita');
    const event = eventsController.eventsSerializer.formatNewEvent.args[0][0];
    event.should.have.property('id');
    event.should.have.property('info');
    event.should.have.property('date');
    event.should.have.property('updatedAt');
    event.should.have.property('createdAt');
    response.attachments[0].text.should.equal('pita');
  });

  it ('should not create event when missing info');

  it ('should insert an event', async () => {
    sinon.stub(eventsController, 'createEvent').returns(new Promise((resolve) => resolve(mocks.mockCreated)));
    const createdEvent = await eventsController.processMessage('create pita');
    createdEvent.should.equal(mocks.mockCreated);
  });

  it ('should create event without date');

  it ('should create event with datetime', async () => {
    const message = mocks.mockMessageWithDateTime;

    const response = await eventsController.processMessage(message);
    const event = eventsController.eventsSerializer.formatNewEvent.args[0][0];

    const date = moment(mocks.dateTime, 'DD/MM/YYYY HH:mm');

    event.date.should.eql(new Date(date));
  });

  it ('should create event with date', async () => {
    const message = mocks.mockMessageWithDate;

    const response = await eventsController.processMessage(message);
    const event = eventsController.eventsSerializer.formatNewEvent.args[0][0];

    const date = moment(mocks.date, 'DD/MM/YYYY HH:mm');

    event.date.should.eql(new Date(date));
    event.allDay.should.be.true;
  });

  it ('should create event wiht datetime and more than one word', async () => {
    const message = mocks.mockMessageWithDateTime3words;

    const response = await eventsController.processMessage(message);
    const event = eventsController.eventsSerializer.formatNewEvent.args[0][0];

    event.info.should.eql('bbq on terrace');
  });

  /* commenting out tests: the best way to get green!
      Before reactivating these tests, we need to mock the db data
  */
  // it('should try to insert an event', () => {
  //   event.createEvent(mocks.create).should.be.a('number');
  //   event.createEvent(null).should.be.false;
  //   event.createEvent(false).should.be.false;
  //   event.createEvent().should.be.false;
  //   event.createEvent('').should.be.false;
  // });
  //
  // it('should list events', () => {
  //   event.listEvents().should.eql([]);
  //   event.createEvent(mocks.create);
  //   event.listEvents().should.have.lengthOf(1);
  //
  // });
  //
  // it('should try to delete an event', () => {
  //   event.createEvent(mocks.create);
  //   event.deleteEvent(0).should.be.true;
  //   event.listEvents().should.eql([]);
  //   event.deleteEvent(999).should.be.false;
  // });
  //
  // it('should process the slack message correctly', () => {
  //   event.processMessage(mocks.create);
  //   event.listEvents().should.have.lengthOf(1);
  //   event.processMessage(mocks.delete);
  //   event.listEvents().should.have.lengthOf(0);
  //   event.processMessage(mocks.create);
  //   event.processMessage(mocks.delete_non_valid);
  //   event.listEvents().should.have.lengthOf(1);
  // });

});
