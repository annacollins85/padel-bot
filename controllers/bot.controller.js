const Botkit = require('botkit');
const EventsController = require('./events.controller');

class BotController {
  constructor () {
    this.eventsController = new EventsController();

    this.interactiveMessageCallback = this.interactiveMessageCallback.bind(this);
  }

  async answerSlashCommands (slashCommand, message) {
    switch (message.command) {
      case '/' + process.env.BOT_NAME: //handle the `/echo` slash command. We might have others assigned to this app too!
      // but first, let's make sure the token matches!
        if (message.token !== process.env.VERIFICATION_TOKEN) return; //just ignore it.

        // if no text was supplied, treat it as a help command
        if (message.text === '' || message.text === 'help') {
          slashCommand.replyPrivate(message, Strings.HELP);
          return;
        }
        // doesn't work because the constructor never instantiates a new EventsController
        // console.log(this.eventsController)
        // const result = await this.eventsController.processMessage(message.text);
        const events = new EventsController();
        const result = await events.processMessage(message.text);

        slashCommand.replyPublic(message, result); // display a creation message

        return;

      default:
        slashCommand.replyPublic(
          message,
          message.command + ' has not been implemented yet.'
        );
    }
  }

  async interactiveMessageCallback (bot, trigger) {
    const msg = trigger.original_message.attachments;
    const eventName = msg.text;

    //need to instantiate EventsController because if not, this.eventsController from constructor is undefined.

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
        console.log(this);
        this.eventsController.updateAttendees(msg);
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
        this.eventsController.updateAttendees(msg);
        break;

    }
  }

}

module.exports = BotController;
