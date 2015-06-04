import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'emstagram/tests/helpers/start-app';
import Pretender from 'pretender';

let application, server;

const GRAMS = {
  grams: [{
    id: 1,
    image: 'http://placekitten.com/300/300',
    likes: 5,
    title: 'Gram 1',
    user: 'user_1'
  }, {
    id: 2,
    image: 'http://placehold.it/300x300/eee',
    likes: 10,
    title: 'Gram 2',
    user: 'user_1'
  }, {
    id: 3,
    image: 'http://placehold.it/300x300/bbb',
    likes: 15,
    title: 'Gram 3',
    user: 'user_1'
  }]
};

module('Acceptance | grams', {
  beforeEach() {
    application = startApp();

    server = new Pretender();
    server.get('/api/grams', function(request) {
      const response = JSON.stringify(GRAMS);
      return [200, { 'Content-Type': 'application/json' }, response];
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting /grams shows 3 grams', function(assert) {
  visit('/grams');

  andThen(function() {
    const grams = find('.gram');
    assert.equal(grams.length, 3);

    const firstGramTitle = find('.gram:eq(0) .gram__title');
    assert.equal(firstGramTitle.text(), 'Gram 1');

    const firstGramPhoto = find('.gram:eq(0) .gram__figure img');
    assert.equal(firstGramPhoto.attr('src'), 'http://placekitten.com/300/300');

    const firstGramUsername = find('.gram:eq(0) .gram__username');
    assert.equal(firstGramUsername.text(), 'user_1');
  });
});

test('user can increment like count', function(assert) {
  visit('/grams');

  andThen(function() {
    const firstGramLikes = find('.gram:eq(0) .gram__likes');
    assert.equal(firstGramLikes.text(), 5);
  });

  click('.gram:eq(0) .gram__toggle-like');

  andThen(function() {
    const firstGramLikes = find('.gram:eq(0) .gram__likes');
    assert.equal(firstGramLikes.text(), 6);
  });
});
