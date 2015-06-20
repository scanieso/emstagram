import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:grams/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('form may be submitted with valid input', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('model', gram);

  controller.get('gram').setProperties({
    imageUrl: 'url_here',
    user: 'user_here'
  });
  assert.equal(controller.get('isSubmittable'), true, 'form is submittable with image and user');
  assert.equal(controller.get('isDisabled'), !controller.get('isSubmittable'), 'button is enabled when form is submittable');
});

test('form cannot be submitted with invalid input', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('model', gram);

  gram.set('imageUrl', '');
  assert.equal(controller.get('isSubmittable'), false, 'form is not submittable without image');
  assert.equal(controller.get('isDisabled'), !controller.get('isSubmittable'), 'button is disabled when form is not submittable');

  gram.setProperties({
    imageUrl: 'has_image',
    user: null
  });

  assert.equal(controller.get('isSubmittable'), false, 'form is not submittable without user');
});

test('onSelection sets blob on model', function(assert) {
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

  controller.send('onSelection', blob);
});
