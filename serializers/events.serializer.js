'use strict';

const Strings = require('../utils/strings');

const moment = require('moment');

module.exports.parseEvent = (eventInfo) => {
  const [action, ...params] = eventInfo.split(' ');
  return { action: action, params: params.join(' ') };
};

/* The list feature is WIP */
// module.exports.formatEventList = (events) => {
//   if (events.length < 1) {
//     return Strings.NO_EVENTS;
//   }
//
//   let eventlist = events.map( el => {
//     return (({ id, info, date }) => ({ id, info, date }))(el);
//   });
//
//   const eventListMessage = Strings.EVENT_LIST + eventlist.map( ev => {
//     return `\n ${ev.id} ${ev.info} ${ev.date}`;
//   }).join();
//
//   return {
//     'response_type': 'in_channel',
//     'text' : eventListMessage
//   };
// };

module.exports.formatNewEvent = (event) => {
  const eventInfo = event.info;
  let response = {
    'response_type': 'in_channel',
    'text': 'A new event has just been created! Fancy joining?',
    'attachments': [{
      'text': eventInfo,
      'attachment_type': 'default',
      'actions': [
        {
          'name': 'register',
          'text': 'Count me in!',
          'type': 'button',
          'value': event.id
        },
        {
          'name': 'unregister',
          'text': 'Sorry! I can\'t make it anymore.',
          'type': 'button',
          'value': event.id
        }
      ],
      'callback_id': 'participate',
    }]
  };
  return response;
};
