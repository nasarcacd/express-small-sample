var router = require('express').Router();
var usersRouter = require('./api/users');
var articlesRouter = require('./api/articles');

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);


module.exports = router;