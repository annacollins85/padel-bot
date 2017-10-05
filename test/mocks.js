'use strict';

module.exports.mockSerializer = {
  create: 'create 2017-07-31 10:40',
  list: 'list',
  delete: 'delete 0',
  non_valid: 'non valid string',
  delete_non_valid: 'delete 999',
};

module.exports.mockCreated = {
  'response_type': 'in_channel',
  'text': 'A new event has just been created! Will you attend?',
  'attachments': [{
    'text': 'pita',
    'attachment_type': 'default',
    'actions': [
      {
        'name': 'register',
        'text': 'Count me in!',
        'type': 'button',
        'value': 42
      },
      {
        'name': 'unregister',
        'text': 'Sorry! I can\'t make it anymore.',
        'type': 'button',
        'value': 42
      }
    ],
    'callback_id': 'participate',
  }]
};

//for botController tests
module.exports.mockMessage = {
  token: 'lOjCiV3rbcT7aO5qBxxXS2iw',
  team_id: 'T0WU5R8NT',
  team_domain: 'codeworksbcn',
  channel_id: 'D40113ZBL',
  channel_name: 'directmessage',
  user_id: 'U3Z9NSNRW',
  user_name: 'isachenx',
  command: '/fluffbot',
  text: 'create aimee',
  response_url: 'https://hooks.slack.com/commands/T0WU5R8NT/251433408742/UAzAbVcXckEXtzg7ubGhllma',
  trigger_id: '249896115488.30957858775.0784b53012126f2084236d579a203c70',
  user: 'U3Z9NSNRW',
  channel: 'D40113ZBL',
  type: 'slash_command'
};

// module.exports.slashCommand = {
//
// }

module.exports.dateTime = '04/10/2017 14:00';
module.exports.mockMessageWithDateTime = 'create bbq ' + module.exports.dateTime;
module.exports.mockMessageWithDateTime3words = 'create bbq on terrace ' + module.exports.dateTime;
module.exports.date = '04/10/2017';
module.exports.mockMessageWithDate = 'create bbq ' + module.exports.date;
