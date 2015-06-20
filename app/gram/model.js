import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr } = DS;

export default Model.extend({
  blob: computed({
    get() {
      return {
        imageUrl: this.get('imageUrl')
      };
    },

    set(key, value) {
      this.set('imageUrl', value.url);

      return {
        imageUrl: this.get('imageUrl')
      };
    }
  }),

  createdAt: attr('date'),
  imageUrl: attr('string'),
  liked: attr('boolean', { defaultValue: false }),
  likesCount: attr('number', { defaultValue: 0 }),
  title: attr('string', { defaultValue: '' }),
  user: attr('string')
});
