/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'emstagram',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'frame-src': "*.filepicker.io",
      'img-src': "'self' placeholdit.imgix.net placehold.it placekitten.com",
      'script-src': "'self' 'unsafe-eval' *.filepicker.io",
      'style-src': "'self' 'unsafe-inline'"
    }
  };

  ENV.filepickerKey = 'AwDRKk3xPRcGxYiYmNtp4z';

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:devise'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
