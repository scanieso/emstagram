import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['gram'],

  likeText: computed('gram.liked', function() {
    return this.get('gram.liked') ? 'Liked' : 'Like';
  }),

  showLikeButton: computed.alias('isAuthenticated'),

  actions: {
    toggleLike() {
      const liked = this.get('gram.liked');
      this.set('gram.liked', !liked);
    }
  }
});
