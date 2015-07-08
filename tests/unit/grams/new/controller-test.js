import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:grams/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('isSubmittable', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('model', gram);

  controller.get('gram').setProperties({
    imageUrl: 'url_here',
    user: 'user_here'
  });

  assert.equal(controller.get('isSubmittable'), true, 'is true with imageUrl and user');

  gram.set('imageUrl', '');
  assert.equal(controller.get('isSubmittable'), false, 'is false without either imageUrl or user');
});

test('isDisabled', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('model', gram);

  controller.get('gram').setProperties({
    imageUrl: 'url_here',
    user: 'user_here'
  });

  assert.equal(controller.get('isDisabled'), false, 'is false with imageUrl and user');

  gram.set('user', null);
  assert.equal(controller.get('isDisabled'), true, 'is true without either imageUrl or user');
});

test('setImageUrl sets blob on model', function(assert) {
  assert.expect(3);

  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('model', gram);

  const blob = [{ url: 'url_here' }];

  gram.set = function(key, value) {
    assert.ok(true, 'set was called');
    assert.equal(key, 'blob');
    assert.deepEqual(value, blob[0]);
  };

  controller.send('setImageUrl', blob);
});
