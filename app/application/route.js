import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed(error) {
      this.controllerFor('login').set('loginErrorMessage', error.message);
    }
  }
});
