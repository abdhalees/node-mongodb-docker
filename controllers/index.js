var express = require('express');
var companyRouter = require('./company');
var router = express.Router();

router.use('/company', companyRouter);

module.exports = router;
