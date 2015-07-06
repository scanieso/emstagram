module.exports = function(app) {
  var express = require('express');
  var likesRouter = express.Router();

  // likesRouter.get('/', function(req, res) {
  //   res.send({
  //     'likes': []
  //   });
  // });

  likesRouter.post('/', function(req, res) {
    var body = req.body;
    body.like.id = new Date().getTime();
    body.like.created_at = new Date();

    res.send(body);
  });

  likesRouter.get('/:id', function(req, res) {
    res.send({
      'likes': {
        id: req.params.id,
        gram_id: 1,
        user_id: 2
      }
    });
  });

  // likesRouter.put('/:id', function(req, res) {
  //   res.send({
  //     'likes': {
  //       id: req.params.id
  //     }
  //   });
  // });

  likesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/likes', likesRouter);
};
