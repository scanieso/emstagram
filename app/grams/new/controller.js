import Ember from 'ember';

const { Controller, computed, isPresent } = Ember;

export default Controller.extend({
  showFilepicker: false,

  filepickerOptions: {
    container: 'modal',
    cropRatio: 1,
    imageDim: [500, 500],
    mimetypes: ['image/*'],
    services: ['COMPUTER', 'CONVERT']
  },

  gram: computed.alias('model').readOnly(),

  isDisabled: computed.not('isSubmittable'),

  isSubmittable: computed('gram.imageUrl', 'gram.user', function() {
    return isPresent(this.get('gram.imageUrl')) && isPresent(this.get('gram.user'));
  }),

  actions: {
    createGram() {
      const self = this;
      const gram = this.get('gram');

      if (this.get('isSubmittable')) {
        gram.save().then(function() {
          self.transitionToRoute('grams');
        });
      }
    },

    closeFilepicker() {
      this.set('showFilepicker', false);
    },

    setSampleImage() {
      this.get('gram').set('blob', {
        url: '/assets/images/placekitten.jpg'
      });
    },

    setImageUrl(blob) {
      this.get('gram').set('blob', blob[0]);
      this.set('showFilepicker', false);
    },

    showFilepicker() {
      this.set('showFilepicker', true);
    }
  }
});
