const express = require('express');

function routes(app) {
  app.use('/logg-easy', express.json());
}

module.exports = routes;
