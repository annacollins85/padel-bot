'use strict';

require('chai').should();
const sinon = require('sinon');
const BotController = require('../controllers/bot.controller');

describe('BotController', function () {
  let botController;

  beforeEach(() => {
    botController = new BotController();
  });

  // it ('should process the message from Slack', async () => {
  //   // sinon.spy(botController, '')
  //   botController.answerSlashCommands()
  // });
});
