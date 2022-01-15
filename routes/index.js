var router = require('express').Router();
var usersRouter = require('./api/users');

router.use('/users', usersRouter);


module.exports = router;