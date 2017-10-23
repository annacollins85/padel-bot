const Router = require('koa-router');
const router = new Router();

const EventsController = require('./controllers/koa/events.controller');

router.get('/', EventsController.getAllEvents);
router.post('/events', EventsController.postEvent);

//fetch made by frontend db-client service markPaid(attendee)
router.post('/paid', EventsController.markPaid);

module.exports = router;
