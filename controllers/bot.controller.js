const Botkit = require('botkit');
const EventsController = require('./events.controller');

class BotController {
  // constructor () {
  //   this.EventsController = new EventsController();
  // }

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

        const events = new EventsController();
        // console.log(this.EventsController)
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
}

module.exports = BotController;
