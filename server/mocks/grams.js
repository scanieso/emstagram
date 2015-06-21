module.exports = function(app) {
  var express = require('express');
  var gramsRouter = express.Router();

  gramsRouter.get('/', function(req, res) {
    var date = new Date();
    date.setSeconds(date.getSeconds() - 3);

    res.send({
      'grams': [{
        id: 1,
        created_at: new Date(date.setSeconds(date.getSeconds() + 1)),
        image_url: '/assets/images/placeholder.png',
        liked: true,
        likes_count: 5,
        user_id: 1
      }, {
        id: 2,
        created_at: new Date(date.setSeconds(date.getSeconds() + 1)),
        image_url: '/assets/images/placeholder.png',
        likes_count: 5,
        user_id: 1
      }, {
        id: 3,
        created_at: new Date(date.setSeconds(date.getSeconds() + 1)),
        image_url: '/assets/images/placeholder-wizard.png',
        likes_count: 5,
        user_id: 2
      }]
    });
  });

  gramsRouter.post('/', function(req, res) {
    var body = req.body;
    body.gram.id = new Date().getTime();
    body.gram.created_at = new Date();

    res.send(body);
  });

  gramsRouter.get('/:id', function(req, res) {
    res.send({
      'grams': {
        id: req.params.id
      }
    });
  });

  gramsRouter.put('/:id', function(req, res) {
    res.send({
      'grams': {
        id: req.params.id
      }
    });
  });

  gramsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/grams', gramsRouter);
};
