/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const fetchSchedule = require('./schedule');

const app = express();
const port = process.env.PORT || 8080;

var config = process.env.NODE_ENV === 'production'
  ? config = require('../webpack.config.production')
  : require('../webpack.config');

const compiler = webpack(config);

var bundler = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  proxy: {
    '*/api/schedule': {
      target: 'http://localhost:' + port,
      secure: false,
    }
  },
  historyApiFallback: true
});

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/schedule', (req, res) => {
  fetchSchedule().then(schedule => res.send(schedule));
});

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.env.PWD + '/dist' });
});

app.listen(port);
bundler.listen(3000);
