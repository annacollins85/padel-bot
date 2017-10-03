const Router = require('koa-router');
const router = new Router();

const EventsController = require('./controllers/koa/events.controller');

router.get('/', EventsController.getAllEvents);

module.exports = router;
