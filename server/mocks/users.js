module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  var USERS = [{
    id: 1,
    username: 'scanieso'
  }, {
    id: 2,
    username: 'harrypotter'
  }];

  usersRouter.get('/', function(req, res) {
    res.send({
      'users': USERS
    });
  });

  usersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  usersRouter.get('/:id', function(req, res) {
    res.send({
      'users': USERS[req.params.id - 1]
    });
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  usersRouter.post('/sign_in', function(req, res) {
    res.send({
      email: 'email@domain.com',
      token: 'access_token',
      user_id: 1
    });
    res.status(200).end();
  });

  app.use('/api/users', usersRouter);
};
