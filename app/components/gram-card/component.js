import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['gram'],

  setLiked: undefined,
  setUnliked: undefined,

  like: computed('gram.likes.@each', function() {
    const currentUser = this.get('currentUser');

    const promise = this.get('gram.likes').then(function(likes) {
      return likes.find(function(like) {
        return like.get('user.username') === currentUser.get('username');
      });
    });

    return DS.PromiseObject.create({ promise });
  }),

  likesLabel: computed('gram.likes', {
    get() {
      this.get('gram.likes').then((likes) => {
        const likesLabel = likes.length === 1 ? 'like' : 'likes';
        this.set('likesLabel', likesLabel);
      });
    },
    set(key, value) {
      return value;
    }
  }),

  showLikeButton: computed.alias('isAuthenticated'),

  actions: {
    toggleLike() {
      this.get('like').then((like) => {
        if (Ember.isPresent(like)) {
          this.sendAction('setUnliked', like);
        } else {
          this.sendAction('setLiked', this.get('gram'));
        }
      });
    }
  }
});
