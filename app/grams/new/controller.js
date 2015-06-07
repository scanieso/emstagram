import Ember from 'ember';

const { computed, isBlank } = Ember;

export default Ember.Controller.extend({
  isSubmittable: computed('image', function() {
    return !isBlank(this.get('image'));
  }),

  isDisabled: computed.not('isSubmittable'),

  actions: {
    createGram() {
      const self = this;
      let gram;

      if (this.get('isSubmittable')) {
        gram = this.store.createRecord('gram', {
          image: this.get('image')
        });

        gram.save().then(function() {
          self.transitionToRoute('grams');
        });
      }
    }
  }
});
