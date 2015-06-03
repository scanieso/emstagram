import Ember from 'ember';

export default Ember.Controller.extend({
  grams: Ember.computed.alias('model'),

  actions: {
    toggleLike(gram) {
      let likes = gram.get('likes');
      likes++;
      gram.set('likes', likes);
    }
  }
});
