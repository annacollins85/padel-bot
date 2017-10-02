'use strict';

require('chai').should();
const sinon = require('sinon');
const Event = require('../models/event');

describe ('EventModel', function () {
  it('should insert an event into the database', async () => {
    sinon.spy(Event, 'create');

    const event = await Event.createEvent('pita');
    Event.create.called.should.be.true;
    event.should.have.property('info').with.valueOf('pita');
    event.should.have.property('id');
    event.should.have.property('date');
    event.should.have.property('updatedAt');
    event.should.have.property('createdAt');

    Event.create.restore();
  });

  it ('should delete an event from the database', async () => {
    sinon.spy(Event, 'destroy');

    const destroyed = await Event.deleteEvent('pita');
    Event.destroy.called.should.be.true;
    destroyed.should.equal(1);

    Event.destroy.restore();
  });
});
