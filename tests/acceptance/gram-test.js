import Ember from 'ember';
import DS from 'ember-data';
import { module, test } from 'qunit';
import startApp from 'emstagram/tests/helpers/start-app';
import Pretender from 'pretender';

let application, server;

const GRAMS = {
  grams: [{
    id: 1,
    created_at: new Date('06/15/15'),
    image_url: 'url_here.png',
    like_ids: [1],
    user_id: 1
  }, {
    id: 2,
    created_at: new Date('06/14/15'),
    image_url: '/assets/images/placeholder.png',
    like_ids: [2],
    user_id: 1
  }, {
    id: 3,
    created_at: new Date('06/13/15'),
    image_url: '/assets/images/placeholder.png',
    like_ids: [],
    user_id: 2
  }]
};

const USERS = {
  users: [{
    id: 1,
    username: 'scanieso'
  }, {
    id: 2,
    username: 'harrypotter'
  }]
};

const LIKES = {
  likes: [{
    id: 1,
    gram_id: 1,
    user_id: 1
  }, {
    id: 2,
    gram_id: 2,
    user_id: 1
  }]
};

module('Acceptance | gram', {
  beforeEach() {
    application = startApp();

    server = new Pretender();
    server.get('/api/grams', function(request) {
      const response = JSON.stringify(GRAMS);
      return [200, { 'Content-Type': 'application/json' }, response];
    });

    server.post('/api/grams', function(request) {
      return [201, { 'Content-Type': 'application/json' }, request.requestBody];
    });

    server.get('/api/grams/:id', function(request) {
      const response = JSON.stringify(GRAMS);
      return [200, { 'Content-Type': 'application/json' }, response];
    });

    server.delete('/api/grams/:id', function(request) {
      return [204, {}, ''];
    });

    server.get('/api/users/:id', function(request) {
      const user = {
        users: [USERS.users[request.params.id - 1]]
      };
      const response = JSON.stringify(user);
      return [200, { 'Content-Type': 'application/json' }, response];
    });

    server.get('/api/likes/:id', function(request) {
      const like = {
        likes: [LIKES.likes[request.params.id - 1]]
      };
      const response = JSON.stringify(like);
      return [200, { 'Content-Type': 'application/json' }, response];
    });

    server.delete('/api/likes/:id', function(request) {
      const like = {
        likes: [LIKES.likes[request.params.id - 1]]
      };
      const response = JSON.stringify(like);
      return [200, { 'Content-Type': 'application/json' }, response];
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting grams/1 shows gram details', function(assert) {
  login();
  visit('/grams/1');

  andThen(function() {
    assert.equal(currentPath(), 'grams.gram');
  });
});

test('visiting detail page displays correct content', function(assert) {
  login();
  visit('/grams/1');

  andThen(function() {
    const $gram = find('.gram');
    assert.equal($gram.length, 1, 'gram-card component displays');

    const $image = find('.gram__image');
    assert.equal($image.attr('src'), 'url_here.png', 'image is displayed');

    const $username = find('.gram__username');
    assert.equal($username.text(), 'scanieso', 'username is displayed');
  });
});

test('user can delete gram', function(assert) {
  login();
  visit('/grams');

  andThen(function() {
    const $grams = find('.gram');
    assert.equal($grams.length, 3, 'starts off with 3 grams');
  });

  click('.gram:eq(0) .gram__details');

  click('.gram:eq(0) .gram__delete');

  andThen(function() {
    assert.equal(currentPath(), 'grams.index', 'user is redirected to index');
    const $grams = find('.gram');
    assert.equal($grams.length, 2, 'page now has 2 grams');
  });
});
