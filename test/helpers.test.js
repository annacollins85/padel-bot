'use strict';

require('chai').should();

const mocks = require('./mocks');
const eventsSerializer = require('../serializers/events.serializer');

describe('Parse events', () => {

  it('should parse the correct action', () => {
    eventsSerializer.parseEvent(mocks.mockSerializer.create).action.should.equal('create');
    eventsSerializer.parseEvent(mocks.mockSerializer.list).action.should.equal('list');
    eventsSerializer.parseEvent(mocks.mockSerializer.delete).action.should.equal('delete');
    eventsSerializer.parseEvent(mocks.mockSerializer.non_valid).action.should.equal('non');
  });

});
