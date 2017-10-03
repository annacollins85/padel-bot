'use strict';

require('chai').should();
const sinon = require('sinon');
const BotController = require('../controllers/bot.controller');
const mocks = require('./mocks');

describe('BotController', function () {
  let botController;

  beforeEach(() => {
    botController = new BotController();
  });

  it ('should process the message from Slack', async () => {
    sinon.spy(botController.eventsController, 'processMessage');
    botController.eventsController.processMessage(mocks.mockMessage);
    botController.eventsController.processMessage.called.should.be.true;
  });

});
