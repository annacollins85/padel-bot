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
    console.log(botController.eventsController.processMessage);
    //how to test function when slashCommand is passed in by botKit?
    await botController.answerSlashCommands(slashCommand , mocks.mockMessage);
    //Not entirely sure this is spying on the events.processMessage that's run i the botController
    //as it is not this.eventsController.processMessage....
    sinon.spy(botController.eventsController, 'processMessage');
    botController.eventsController.processMessage.called.should.be.true;
  });

});
