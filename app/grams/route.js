import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('gram');
    // const gram1 = { title: 'Gram 1', created_at: new Date() };
    // const gram2 = { title: 'Gram 2', created_at: new Date() };
    // const gram3 = { title: 'Gram 3', created_at: new Date() };
    // return [gram1, gram2, gram3];
  }
});
