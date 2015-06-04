import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'emstagram/tests/helpers/start-app';
import Pretender from 'pretender';

let application;
let server;

module('Acceptance | authentication', {
  beforeEach: function() {
    application = startApp();
    server = new Pretender();
    server.get('/api/grams', function() {
      return [200, { 'Content-Type': 'application/json' }, '{ "grams": [] }'];
    });
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('user can log in', function(assert) {
  visit('/');

  server.post('/users/sign_in', function(request) {
    const json = JSON.stringify({ access_token: 'access_token' });
    return [200, { 'Content-Type': 'application/json' }, json];
  });

  andThen(function() {
    const login = find('.app-nav .login');
    assert.equal(login.length, 1, 'this page shows a login link when the session is not authenticated');
  });

  visit('/login');
  fillIn('#login-identification', 'letmein@domain.com');
  fillIn('#login-password', 'gogogo123');
  click('button:contains("Login")');

  andThen(function() {
    const logout = find('a:contains("Logout")');
    assert.equal(logout.length, 1, 'this page shows a logout link when the session is authenticated');
  });
});

test('user gets error when they use wrong password', function(assert) {
  visit('/');

  server.post('/users/sign_in', function(request) {
    const json = JSON.stringify({ access_token: 'access_token' });
    return [401, { 'Content-Type': 'application/json' }, json];
  });

  assert.equal(false, true);
});

test('a protected route is accessible when the session is authenticated', function(assert) {
  authenticateSession();
  visit('/grams');

  andThen(function() {
    assert.equal(currentPath(), 'grams.index');
  });
});

test('a protected route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession();
  visit('/grams');

  andThen(function() {
    assert.equal(currentPath() !== 'grams.index', true);
  });
});
