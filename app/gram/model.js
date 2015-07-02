import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr, belongsTo, hasMany } = DS;

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
  likes: hasMany('like', { async: true }),
  user: belongsTo('user', { async: true })
});
