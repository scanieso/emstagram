import Ember from 'ember';

const { computed, isBlank } = Ember;

export default Ember.Controller.extend({
  gram: computed.alias('model'),

  filepicker: Ember.inject.service(),

  filepickerOptions: {
    mimetypes: ['image/*'],
    services: ['COMPUTER', 'WEBCAM', 'FACEBOOK', 'GMAIL', 'BOX', 'DROPBOX', 'FLICKR', 'INSTAGRAM']
  },

  isDisabled: computed.not('isSubmittable'),

  isSubmittable: computed('gram.imageUrl', function() {
    return !isBlank(this.get('gram.imageUrl'));
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
        filename: 'image.png',
        url: 'http://placekitten.com/150/151'
      });
    },

    onSelection(blob) {
      this.get('gram').set('blob', blob);
    },

    setOpenPicker() {
      this.set('openPicker', true);
    }
  }
});
