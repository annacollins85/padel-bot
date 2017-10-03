const Router = require('koa-router');
const router = new Router();

const KoaEventsController = require('./controllers/koa-events.controller');

router.get('/', KoaEventsController.getAllEvents);

module.exports = router;
