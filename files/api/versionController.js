const express = require('express');
const router = express.Router();

const version1 = require('./version1');

router.use('/version1' , version1);

module.exports = router;

//(ip):port/api