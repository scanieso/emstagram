import Ember from 'ember';
import DS from 'ember-data';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const { RSVP, isPresent, run } = Ember;
const { PromiseObject } = DS;

const EmObject = Ember.Object;

const LIKES = [
EmObject.create({ user: EmObject.create({ username: 'user1' }) }),
EmObject.create({ user: EmObject.create({ username: 'user2' }) })
];

const setLikes = function() {
  const usernames = Array.prototype.slice.call(arguments);

  const likes = usernames.map(function(username) {
    return EmObject.create({
      user: EmObject.create({ username })
    });
  });

  run(() => {
    this.set('gram.likes', PromiseObject.create({
      promise: new RSVP.Promise(function(resolve, reject) {
        resolve(likes);
      })
    }));
  });
};

moduleForComponent('gram-card', 'Integration | Component | gram card', {
  integration: true,

  beforeEach() {
    this.set('currentUser', EmObject.create({ username: 'hp123' }));
    this.set('isAuthenticated', true);

    this.set('gram', EmObject.create({
      likes: PromiseObject.create({
        promise: new RSVP.Promise(function(resolve, reject) {
          resolve(LIKES);
        })
      })
    }));
  }
});

test('like button is visible if authenticated', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{gram-card
      currentUser=currentUser
      gram=gram
      isAuthenticated=isAuthenticated}}
      `);

  let $likeButton = this.$('.gram__toggle-like');
  assert.equal($likeButton.length, 1, 'like button is shown when authenticated');

  this.set('isAuthenticated', false);
  $likeButton = this.$('.gram__toggle-like');
  assert.equal($likeButton.length, 0, 'like button is hidden when not authenticated');
});

test('user can like gram', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{gram-card
      gram=gram
      currentUser=currentUser
      isAuthenticated=isAuthenticated
      setLiked="action1"
      setUnliked="action2"}}
      `);

  this.on('action1', gram => assert.equal(gram, this.get('gram'), 'setLiked action was called with gram'));
  this.on('action2', like => assert.ok(isPresent(like), 'setUnliked action was called with like'));

  this.$('.gram__toggle-like').click();

  this.on('action1');

  setLikes.call(this, 'hp123');
  this.$('.gram__toggle-like').click();
});

test('like text displays correctly', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{gram-card
      currentUser=currentUser
      gram=gram
      isAuthenticated=isAuthenticated}}
      `);

  const $likeButton = this.$('.gram__toggle-like');
  assert.equal($.trim($likeButton.text()), 'Like', 'likeText is "Like" when not liked');

  setLikes.call(this, 'hp123');
  assert.equal($.trim($likeButton.text()), 'Liked', 'likeText is "Liked" when liked');
});

test('likes label displays correctly', function(assert) {
  assert.expect(3);

  this.render(hbs`
    {{gram-card
      gram=gram
      currentUser=currentUser
      isAuthenticated=isAuthenticated}}
      `);

  const $likesLabel = this.$('.gram__likes-label');
  assert.equal($likesLabel.text(), 'likes', 'likes label is plural when likesCount is 2');

  setLikes.call(this);
  assert.equal($likesLabel.text(), 'likes', 'likes label is plural when likesCount is not 1');

  setLikes.call(this, 'hp123');
  assert.equal($likesLabel.text(), 'like', 'likes label is singular when likesCount is 1');
});

test('if delete action, delete button displays and can delete gram', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{gram-card
      gram=gram
      delete="action1"
      currentUser=currentUser
      isAuthenticated=authenticated}}`);

  const $deleteButton = this.$('.gram__delete');
  assert.equal($deleteButton.length, 1, 'delete button is visible');

  this.on('action1', gram => assert.ok(Ember.isPresent(gram), 'delete action was called'));
  $deleteButton.click();
});
