const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

global.config = require('./files/config');

//Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/MusicStore');
mongoose.Promise = global.Promise;

//default setting
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json({ type : 'application/json' }));
app.use(expressValidator());

const webRouter = require('./files/web/web');
const apiRouter = require('./files/api/versionController');
const showdbRouter = require('./files/ShowDB/showdb');

app.use('/web' , webRouter);
app.use('/api' , apiRouter);
app.use('/showdb' , showdbRouter);

app.listen(config.port , () => {
    console.log(`Server running on port ${config.port}`);
});