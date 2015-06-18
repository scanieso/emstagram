import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr } = DS;

export default Model.extend({
  blob: computed({
    get() {
      return {
        imageFilename: this.get('imageFilename'),
        imageUrl: this.get('imageUrl')
      };
    },
    set(key, value) {
      this.set('imageFilename', value.filename);
      this.set('imageUrl', value.url);

      return {
        imageFilename: this.get('imageFilename'),
        imageUrl: this.get('imageUrl')
      };
    }
  }),

  imageFilename: attr('string'),
  imageUrl: attr('string'),
  liked: attr('boolean', { defaultValue: false }),
  likesCount: attr('number', { defaultValue: 0 }),
  title: attr('string', { defaultValue: '' }),
  user: attr('string')
});
