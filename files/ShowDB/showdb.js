const express = require('express');
const router = express.Router();

router.get('/test' , (req , res) => {
    res.json("for test");
});

module.exports = router;

//(ip):port/showdb/