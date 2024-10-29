const { Router } = require('express');

const user = Router();

const parsedController = (req, res) => '';

user.post('/register', (req, res) => {
  parsedController(req, res);
});

module.exports = user;
