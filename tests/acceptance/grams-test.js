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
    image_url: '/assets/images/placeholder.png',
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

module('Acceptance | grams', {
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

test('visiting index redirects to grams', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), 'grams.index');
  });
});

test('visiting /grams shows 3 grams', function(assert) {
  visit('/grams');

  andThen(function() {
    const grams = find('.gram');
    assert.equal(grams.length, 3, 'there are 3 grams');

    const firstGramUrl = find('.gram:eq(0) .gram__figure img');
    assert.equal(firstGramUrl.attr('src'), '/assets/images/placeholder.png', 'the first gram\'s url is "/assets/images/placeholder.png"');
  });
});

test('user can like a gram', function(assert) {
  visit('/grams');

  invalidateSession();
  andThen(function() {
    assert.equal(find('.gram:eq(0) .gram__toggle-like').length, 0, 'like buttons are not visible if not authenticated');
  });

  login();
  andThen(function() {
    const like = find('.gram:eq(0) .gram__liked');
    assert.equal(like.text(), 'Liked', 'liked gram\'s like button displays with text "Liked"');
  });

  click('.gram:eq(0) .gram__toggle-like');

  andThen(function() {
    const like = find('.gram:eq(0) .gram__liked');
    assert.equal(like.text(), 'Like', 'unliked gram\'s like button displays with text "Like"');
  });
});

test('user can add new gram', function(assert) {
  login();

  visit('/grams');
  andThen(function() {
    const grams = find('.gram');
    assert.equal(grams.length, 3, 'page starts off with 3 grams');
  });

  click('.new-gram-button');

  andThen(function() {
    assert.equal(currentPath(), 'grams.new', 'user goes to /grams/new');

    const backButton = find('.cancel-button');
    assert.equal(backButton.length, 1, 'user can cancel adding new gram');
  });

  // trigger onSelection action instead here
  click('#new-gram-form .mockFilePick');
  click('#new-gram-form button[type="submit"]');

  andThen(function() {
    assert.equal(currentPath(), 'grams.index', 'user is redirected to /grams');

    const grams = find('.gram');
    assert.equal(grams.length, 4, 'page now shows 4 grams');
  });
});

test('user can fail to add new gram', function(assert) {
  login();

  visit('/grams/new');

  click('#new-gram-form button[type="submit"]');

  andThen(function() {
    const disabledSubmitButton = find('#new-gram-form button[type="submit"]:disabled');
    assert.equal(disabledSubmitButton.length, 1, 'user cannot submit form');

    assert.equal(currentPath(), 'grams.new', 'user is not redirected without valid input');
  });
});
