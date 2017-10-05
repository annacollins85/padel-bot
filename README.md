# Padel Slack bot

This Slack bot helps people organize various events like padel games.

## Tech stack

BotKit - listens to Slack requests and answers them

Sqlite - stores event details

Localtunnel - exposes the server to the internet if you're behind a NAT

## Installing

Fork and clone the repo

Run `npm install` to install the dependencies

Download localtunnel `npm install -g localtunnel` and execute it like this `lt --port 8765 --subdomain cwbcn `. Be aware that it can be unreliable, needing to be restarted frequently.

Go to the slack api page (https://api.slack.com/apps) and create a new app.

In the [Slack slash command settings](https://api.slack.com/apps/A6EMKTEAJ/slash-commands), in the Command, create your command (e.g. /botname), in Request URL use https://cwbcn.localtunnel.me/slack/receive. Under OAuth and Permissions, be sure to add the redirect URL, which will be https://cwbcn.localtunnel.me/oauth.

In your app, add a .env file with: CLIENT_ID=<your api client id>, CLIENT_SECRET<your api client secret>, PORT=8675, VERIFICATION_TOKEN=<your verification token> and BOT_NAME=<your bot name>

Go to the [Slack admin panel's App  Credentials](https://api.slack.com/apps/A6EMKTEAJ/general) and use the information to start the application like this : `CLIENT_ID=<client id> CLIENT_SECRET=<client secret> VERIFICATION_TOKEN=<verification token> PORT=8765 npm run dev`

Authenticate the application with Oauth by going to (http://localhost:8765/login)

## Use

Type ```/botname create 13:00 tomorrow``` to create a new event

Type ```/botname next``` to see the next event

If more than one person is working on the project, each team member has to create a separate slack app and run localtunnel under a different subdomanin. E.g.cwbcn2.

## Contributing

- fix the tests by mocking the database data

- replace the file store database on which this BotKit implementation relies by a table in the app's SQlite database.

- implement a database persistance for the attendance tracking

- add button to unregister from an event

- list upcoming events and sort them by date, with their corresponding attendance

- add configurable event reminders

- add the events to people's Google/Outlook calendars once they register

- manage payments among participants (enter total amount, split by number of participants, send paypal link as DM)

- decouple the localtunnel command line app from the bot on development


Made with love in [Codeworks](http://www.codeworks.me)
