/* eslint-disable no-alert, no-console */
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const cors = require('kcors');
const logger = require('koa-logger');

const Botkit = require('botkit');
const Strings = require('./utils/strings');

const BotController = require('./controllers/bot.controller');
const EventsController = require('./controllers/events.controller');
require('dotenv').config();

app
  .use(cors())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000, () => {
    console.log('Koa app listening on port 3000');
  });


/** CONNECTION TO SLACK **/

if (
  !process.env.CLIENT_ID ||
  !process.env.CLIENT_SECRET ||
  !process.env.PORT ||
  !process.env.VERIFICATION_TOKEN
) {
  console.log(
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

const botController = new BotController();

/** ANSWERS SLASH COMMANDS **/
controller.on('slash_command', botController.answerSlashCommands);

const eventsController = new EventsController();


/** ANSWERS BUTTON CLICKS **/
controller.on('interactive_message_callback', botController.interactiveMessageCallback);
