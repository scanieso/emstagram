import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');

  this.route('grams', function() {
    this.route('new');

    this.route('gram', { path: '/:gram_id' });
  });
});

export default Router;
