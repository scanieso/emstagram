import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('gram');
  },

  deactivate() {
    if (this.get('currentModel.isDirty')) {
      this.get('currentModel').deleteRecord();
    }
  }
});
