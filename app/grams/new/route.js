import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const gram = this.store.createRecord('gram');

    this.get('session.currentUser').then(function(currentUser) {
      gram.set('user', currentUser);
    });

    return gram;
  },

  deactivate() {
    if (this.get('currentModel.isDirty')) {
      this.get('currentModel').deleteRecord();
    }
  }
});
