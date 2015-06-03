module.exports = function(app) {
  var express = require('express');
  var gramsRouter = express.Router();

  gramsRouter.get('/', function(req, res) {
    res.send({
      'grams': [{
        id: 1,
        title: 'My Gram 1'
      }, {
        id: 2,
        title: 'Another cool gram'
      }, {
        id: 3,
        title: 'Someone\'s gram here'
      }]
    });
  });

  gramsRouter.post('/', function(req, res) {
    res.status(201).end();
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
