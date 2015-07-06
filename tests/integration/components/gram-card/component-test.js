import Ember from 'ember';
import DS from 'ember-data';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const { RSVP } = Ember;

const LIKES = [
Ember.Object.create({ user: Ember.Object.create({ username: 'user1' }) }),
Ember.Object.create({ user: Ember.Object.create({ username: 'user2' }) })
];

moduleForComponent('gram-card', 'Integration | Component | gram card', {
  beforeEach() {
    this.set('isAuthenticated', true);

    this.set('gram', Ember.Object.create({
      likes: DS.PromiseObject.create({
        promise: new RSVP.Promise(function(resolve, reject) {
          resolve(LIKES);
        })
      })
    }));
  },

  integration: true
});

test('like button is visible if authenticated', function(assert) {
  assert.expect(2);

  this.set('currentUser', Ember.Object.create({ username: '' }));

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

  this.set('currentUser', Ember.Object.create({ username: 'hp123' }));

  this.render(hbs`
    {{gram-card
      gram=gram
      currentUser=currentUser
      isAuthenticated=isAuthenticated
      setLiked="action1"
      setUnliked="action2"}}
      `);

  this.on('action1', gram => assert.equal(gram, this.get('gram'), 'setLiked action was called with gram'));
  this.on('action2', like => assert.ok(Ember.isPresent(like), 'setUnliked action was called with like'));

  this.$('.gram__toggle-like').click();

  this.on('action1');

  this.set('currentUser', Ember.Object.create({ username: 'user1' }));
  this.$('.gram__toggle-like').click();
});

test('like text displays correctly', function(assert) {
  assert.expect(2);

  this.set('currentUser', Ember.Object.create({ username: 'new_user' }));
  this.render(hbs`
    {{gram-card currentUser=currentUser gram=gram isAuthenticated=isAuthenticated}}
    `);

  const $likeText = this.$('.gram__liked');
  assert.equal($likeText.text(), 'Like', 'likeText is "Like" when not liked');

  this.set('currentUser', Ember.Object.create({ username: 'user2' }));

  assert.equal($likeText.text(), 'Liked', 'likeText is "Liked" when liked');
});

test('likes label displays correctly', function(assert) {
  assert.expect(2);

  this.set('currentUser', Ember.Object.create({ username: 'hp123' }));
  this.render(hbs`
    {{gram-card gram=gram currentUser=currentUser isAuthenticated=isAuthenticated}}
    `);

  const $likesLabel = this.$('.gram__likes-label');
  assert.equal($likesLabel.text(), 'likes', 'likes label is plural when likesCount is not 1');

  Ember.run(() => {
    this.set('gram.likes', DS.PromiseObject.create({
      promise: new RSVP.Promise(function(resolve, reject) {
        resolve([Ember.Object.create({ user: Ember.Object.create({ username: 'user1' }) })]);
      })
    }));
  });

  assert.equal($likesLabel.text(), 'like', 'likes label is singular when likesCount is 1');
});
