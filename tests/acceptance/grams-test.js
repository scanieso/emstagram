import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'emstagram/tests/helpers/start-app';
import Pretender from 'pretender';

let application;
let server;

const GRAMS = {
  grams: [{
    id: 1,
    image: 'http://placekitten.com/300/300',
    likes: 5,
    title: 'Gram 1'
  }, {
    id: 2,
    image: 'http://placehold.it/300x300/eee',
    likes: 10,
    title: 'Gram 2'
  }, {
    id: 3,
    image: 'http://placehold.it/300x300/bbb',
    likes: 15,
    title: 'Gram 3'
  }]
};

module('Acceptance | feed', {
  beforeEach: function() {
    application = startApp();

    server = new Pretender();
    server.get('/api/grams', function(request) {
      const json = JSON.stringify(GRAMS);
      return [200, { 'Content-Type': 'application/json' }, json];
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting feed shows 3 grams', function(assert) {
  visit('/grams');

  andThen(function() {
    const grams = find('.gram');
    assert.equal(grams.length, 3);

    const firstGramTitle = find('.gram:eq(0) .gram__title');
    assert.equal(firstGramTitle.text(), 'Gram 1');

    const firstGramPhoto = find('.gram:eq(0) .gram__figure img');
    assert.equal(firstGramPhoto.attr('src'), 'http://placekitten.com/300/300');
  });
});

test('clicking like button will increment the gram\'s like count', function(assert) {
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

test('user can navigate to new gram route', function(assert) {
  visit('/grams');

  click('#button-new-gram');

  andThen(function() {
    assert.equal(currentPath(), 'grams.new');
  });
});
