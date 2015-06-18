module.exports = function(app) {
  var express = require('express');
  var gramsRouter = express.Router();

  gramsRouter.get('/', function(req, res) {
    res.send({
      'grams': [{
        id: 1,
        image_url: 'http://placehold.it/300x300/eee',
        liked: true,
        likes_count: 5,
        title: 'My photo 1',
        user: 'scanieso'
      }, {
        id: 2,
        image_url: 'http://placehold.it/300x300/eee',
        likes_count: 5,
        title: 'Another cool photo',
        user: 'scanieso'
      }, {
        id: 3,
        image_url: 'http://placehold.it/300x300/eee',
        likes_count: 5,
        title: 'Someone else\'s photo here',
        user: 'harrypotter'
      }]
    });
  });

  gramsRouter.post('/', function(req, res) {
    res.send(req.body);
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
