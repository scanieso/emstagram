import Ember from 'ember';

export default Ember.Controller.extend({
  grams: Ember.computed.alias('model')
});
