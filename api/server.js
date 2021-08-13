const express = require('express');
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');
const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  res.status(200).send(`<h2>Let's write some middleware! YAY!</h2>`);
});

server.use(function (req, res) {
  res.status(404).send(`Ain't nobody got time for dat! Give me a real page!`);
});

module.exports = server;
