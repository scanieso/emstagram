import Ember from 'ember';
import Session from 'simple-auth/session';

const { computed } = Ember;

export default Session.extend({
  currentUser: computed('secure.user_id', function() {
    const userId = this.get('secure.user_id');

    if (userId && this.get('isAuthenticated')) {
      return this._store.find('user', userId);
    }
  })
});
