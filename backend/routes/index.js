const Router = require('express').Router;
const authRoute = require('./auth');
const contactsRoute = require('./contacts');

const router = Router();

router.use('/api/auth', authRoute);
router.use('/api/contacts', contactsRoute);

module.exports = router;

