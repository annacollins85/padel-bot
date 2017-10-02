'use strict';

require('chai').should();
const sinon = require('sinon');
const EventModel = require('../models/event');

describe ('EventModel', function () {
  it ('should insert an event into the database', async () => {
    const insertedEvent = await EventModel.createEvent('pita');
    const result = insertedEvent;
    result.should.have.property('info').with.valueOf('pita');
    result.should.have.property('id');
    result.should.have.property('date');
    result.should.have.property('updatedAt');
    result.should.have.property('createdAt');
  });

  it ('should delete an event from the database', async () => {
    const destroyed = await EventModel.deleteEvent('pita');
    destroyed.should.equal(1);
  });
});
