import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  gram: computed.alias('model'),

  actions: {
    deleteGram(gram) {
      gram.destroyRecord().then(() => {
        this.transitionToRoute('grams');
      });
    }
  }
});
