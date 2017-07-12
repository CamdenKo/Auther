'use strict';

var router = require('express').Router();

router.use('/users', require('./users/user.router'));
router.use('/login', require('./login/login.router'))
router.use('/stories', require('./stories/story.router'));
router.use('/auth', require('./auth/auth.route'))

module.exports = router;
