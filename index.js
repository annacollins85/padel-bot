const Botkit = require('botkit');
const Strings = require('./utils/strings');
const Console = console;
const BotController = require('./controllers/bot.controller');

require('dotenv').config();

const EventsController = require('./controllers/events.controller');

if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.PORT ||
  !process.env.VERIFICATION_TOKEN
) {
  Console.log(
    'Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment'
  );
  process.exit(1);
}

let config = {
  json_file_store: './db_slackbutton_slash_command/',
};

const controller = Botkit.slackbot(config).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ['commands', 'channels:read'],
  redirectUri: 'https://cwbcn.localtunnel.me/oauth'
});

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, function (
    err,
    req,
    res
  ) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

/** ANSWERS SLASH COMMANDS **/

const botController = new BotController();

controller.on('slash_command', botController.answerSlashCommands);


/** ANSWERS BUTTON CLICKS **/
controller.on('interactive_message_callback', function (bot, trigger) {

  const msg = trigger.original_message.attachments;

  switch (trigger.actions[0].name) {
    case 'register':
      // This will need to be refactored and go into the controller and serializer
      if (msg.length < 2) {
        // We need to store the participants in a column in the events table as a JSON object
        msg.push({
          'title': 'People attending (1)',
          'text': ' <@' + trigger.user + '>'
        });
      } else if (msg[1].text.indexOf(trigger.user) === -1) {
        msg[1].title = 'People attending (' + Number(msg[1].text.match(/@/g).length+1) + ')';
        msg[1].text = msg[1].text + ' <@' + trigger.user + '>';
      }
      bot.replyInteractive(trigger, trigger.original_message);
      // EventsController.updateAttendees(info, msg[1].text);// NEED TO PASS EVENT NAME
      break;

    case 'unregister':
      if (msg.length < 2) {
        return; //ignore
      }
      else if (msg[1].text.indexOf(trigger.user) !== -1) {
        if (msg[1].text.match(/@/g).length === 1) {
          msg.pop();
        }
        else {
          const name = ' <@' + trigger.user + '>';
          msg[1].title = 'People attending (' + Number(msg[1].text.match(/@/g).length-1) + ')';
          msg[1].text = msg[1].text.replace(name, '');
        }
      }
      bot.replyInteractive(trigger, trigger.original_message);
      // EventsController.updateAttendees(info, msg[1].text);// NEED TO PASS EVENT NAME
      break;

  }
});
