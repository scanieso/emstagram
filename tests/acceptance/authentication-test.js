import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'emstagram/tests/helpers/start-app';
import Pretender from 'pretender';

let application, server;

module('Acceptance | authentication', {
  beforeEach() {
    application = startApp();
    server = new Pretender();
    server.get('/api/grams', function() {
      return [200, { 'Content-Type': 'application/json' }, '{ "grams": [] }'];
    });
  },

  afterEach() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('user can log in', function(assert) {
  server.post('/api/users/sign_in', function(request) {
    const response = JSON.stringify({ token: 'fake_access_token' });
    return [200, { 'Content-Type': 'application/json' }, response];
  });

  visit('/grams');

  andThen(function() {
    const $loginLink = find('.app-nav .login');
    assert.equal($loginLink.length, 1, 'a login link is visible when the session is not authenticated');
  });

  visit('/login');
  fillIn('#login-identification', 'letmein@domain.com');
  fillIn('#login-password', 'gogogo123');
  click('.login-form button');

  andThen(function() {
    const $logoutLink = find('.logout');
    assert.equal($logoutLink.length, 1, 'a logout link is visible when the session is authenticated');
  });
});

test('user gets error when they use wrong password', function(assert) {
  visit('/grams');

  server.post('/api/users/sign_in', function(request) {
    const response = JSON.stringify({ message: 'invalid_grant' });
    return [401, { 'Content-Type': 'application/json' }, response];
  });

  visit('/login');
  fillIn('#login-identification', 'letmein@domain.com');
  fillIn('#login-password', 'wrongpassword');
  click('.login-form button');

  andThen(function() {
    const $loginLink = find('.app-nav .login');
    assert.equal($loginLink.length, 1, 'login link is visible');

    const $errorMessage = find('.error');
    assert.equal($errorMessage.length, 1, 'error message is visible');
  });
});

test('a protected route is accessible when the session is authenticated', function(assert) {
  login();
  visit('/grams/new');

  andThen(function() {
    assert.equal(currentPath(), 'grams.new');
  });
});

test('a protected route is not accessible when the session is not authenticated', function(assert) {
  invalidateSession();
  visit('/grams/new');

  andThen(function() {
    assert.notEqual(currentPath(), 'grams.new');
  });
});
