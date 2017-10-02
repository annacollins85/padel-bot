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
