import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

const get = Ember.get;
const set = Ember.set;

const { run } = Ember;

moduleForComponent('gram-card', 'Unit | Component | gram card', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('showLikeButton is true if session is authenticated', function(assert) {
  const component = this.subject();

  component.set('isAuthenticated', true);
  assert.equal(component.get('showLikeButton'), true);

  component.set('isAuthenticated', false);
  assert.equal(component.get('showLikeButton'), false);
});

test('likeText is "Liked" when liked, and "Like" when not liked', function(assert) {
  const component = this.subject();
  const gram = {};
  component.set('gram', gram);

  set(gram, 'liked', true);
  assert.equal(component.get('likeText'), 'Liked', 'likeText is "Liked" when liked');

  set(gram, 'liked', false);
  assert.equal(component.get('likeText'), 'Like', 'likeText is "Like" when not liked');
});

test('toggleLike action toggles liked property', function(assert) {
  const component = this.subject();
  const gram = { liked: true };
  component.set('gram', gram);

  run(function() {
    component.send('toggleLike');
  });

  assert.equal(get(gram, 'liked'), false);
});
