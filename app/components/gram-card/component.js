import Ember from 'ember';
import DS from 'ember-data';

const { computed, isPresent } = Ember;

export default Ember.Component.extend({
  classNames: ['gram'],

  currentUser: null,
  isAuthenticated: false,
  setLiked: null,
  setUnliked: null,

  showLikeButton: computed.alias('isAuthenticated'),

  currentUserLike: computed('gram.likes.@each', function() {
    const currentUser = this.get('currentUser');

    const promise = this.get('gram.likes').then(function(likes) {
      return likes.find(function(like) {
        return like.get('user.username') === currentUser.get('username');
      });
    });

    return DS.PromiseObject.create({ promise });
  }),

  likesLabel: computed('gram.likes.[]', {
    get() {
      this.get('gram.likes').then((likes) => {
        const likesLabel = likes.get('length') === 1 ? 'like' : 'likes';
        this.set('likesLabel', likesLabel);
      });
    },
    set(key, value) {
      return value;
    }
  }),

  showDeleteButton: computed('delete', function() {
    return isPresent(this.get('delete'));
  }),

  actions: {
    delete() {
      this.sendAction('delete', this.get('gram'));
    },

    toggleLike() {
      this.get('currentUserLike').then((currentUserLike) => {
        if (Ember.isPresent(currentUserLike)) {
          this.sendAction('setUnliked', currentUserLike);
        } else {
          this.sendAction('setLiked', this.get('gram'));
        }
      });
    }
  }
});
