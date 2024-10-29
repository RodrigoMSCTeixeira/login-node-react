const { Router } = require('express');

const login = Router();

const parsedController = (req, res) => '';

login.post('/login', (req, res) => {
  parsedController(req, res);
});

module.exports = login;
