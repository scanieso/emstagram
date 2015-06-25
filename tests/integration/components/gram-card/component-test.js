import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('gram-card', 'Integration | Component | gram card', {
  integration: true
});

test('like button is visible if authenticated', function(assert) {
  assert.expect(2);

  this.set('isAuthenticated', true);
  this.render(hbs`{{gram-card isAuthenticated=isAuthenticated}}`);

  let $likeButton = this.$('.gram__toggle-like');
  assert.equal($likeButton.length, 1, 'like button is shown when authenticated');

  this.set('isAuthenticated', false);

  $likeButton = this.$('.gram__toggle-like');
  assert.equal($likeButton.length, 0, 'like button is hidden when not authenticated');
});

test('like text displays correctly', function(assert) {
  assert.expect(2);

  this.set('gram', { liked: true });
  this.render(hbs`{{gram-card gram=gram isAuthenticated=true}}`);

  const $likeText = this.$('.gram__liked');

  assert.equal($likeText.text(), 'Liked', 'likeText is "Liked" when liked');

  this.$('.gram__toggle-like').click();
  assert.equal($likeText.text(), 'Like', 'likeText is "Like" when not liked');
});
