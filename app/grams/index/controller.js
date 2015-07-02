import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  grams: computed.sort('model', 'gramsSorting'),
  gramsSorting: ['createdAt:desc'],

  actions: {
    setLiked(gram) {
      let like = this.store.createRecord('like', {
        gram,
        user: this.get('session.currentUser')
      });

      like.save().then(function() {
        gram.get('likes').then(function(likes) {
          likes.pushObject(like);
        });
      });
    },

    setUnliked(like) {
      like.destroyRecord();
    }
  }
});
