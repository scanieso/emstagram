import Ember from 'ember';

const { computed, isPresent } = Ember;

export default Ember.Controller.extend({
  filepicker: Ember.inject.service(),

  filepickerOptions: {
    container: 'modal',
    cropRatio: 1,
    imageDim: [500, 500],
    // imageMin: [500, 500],
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
      let self = this;
      let gram = this.get('gram');

      if (this.get('isSubmittable')) {
        gram.save().then(function() {
          self.transitionToRoute('grams');
        });
      }
    },

    onClose() {
      this.set('openPicker', false);
    },

    onError(filepickerError) {
      if (filepickerError.code !== 101) {
        this.get('errors').pushObject(filepickerError.toString());
      }
    },

    mockFilePick() {
      this.get('gram').set('blob', {
        url: '/assets/images/placekitten.jpg'
        // url: 'http://lorempixel.com/500/500'
      });
    },

    onSelection(blob) {
      this.get('gram').set('blob', blob[0]);
    },

    setOpenPicker() {
      this.set('openPicker', true);
    }
  }
});
