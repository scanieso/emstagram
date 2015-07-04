module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  var USERS = [{
    id: 1,
    email: 'scanieso@gmail.com',
    username: 'scanieso'
  }, {
    id: 2,
    email: 'harrypotter@gmail.com',
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
    var user;

    if (req.body['user[email]'] === 'scanieso@gmail.com') {
      user = USERS[0];
    } else if (req.body['user[email]'] === 'harrypotter@gmail.com') {
      user = USERS[1];
    } else {
      res.status(401).send({
        message: 'User not found.'
      }).end();
    }

    res.send({
      email: user.email,
      token: 'access_token',
      user_id: user.id
    });
    res.status(200).end();
  });

  app.use('/api/users', usersRouter);
};
