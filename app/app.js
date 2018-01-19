const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const dataRouter = require('./routes/data_router.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/data', dataRouter);

module.exports = app;
