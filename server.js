require('dotenv').config();

process.env.ENV = process.env.ENV || 'dev';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const app = require('./app/app');

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, '/client/static')));
app.get('/', (req, res) => {
  response.sendFile(path.join(__dirname, 'client/static/index.html'));
});

app.listen(process.env.PORT);
