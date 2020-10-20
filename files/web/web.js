const express = require('express');
const router = express.Router();

router.get('/test' , (req , res) => {
    res.send('test');
});

module.exports = router;


//(ip):port/web
