import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  grams: computed.sort('model', 'gramsSorting'),
  gramsSorting: ['createdAt:desc']
});
