import Ember from 'ember';
import Session from 'simple-auth/session';

const { computed } = Ember;

export default Session.extend({
  currentUser: computed('secure.id', function() {
    const userId = this.get('secure.id');

    if (userId && this.get('isAuthenticated')) {
      return this._store.find('user', userId);
    }
  })
});
