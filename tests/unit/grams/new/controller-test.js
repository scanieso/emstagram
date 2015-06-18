import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:grams/new', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('form may be submitted with valid input', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('gram', gram);

  controller.get('gram').set('imageUrl', 'url_here');

  assert.equal(controller.get('isSubmittable'), true, 'form is submittable with image');
  assert.equal(controller.get('isDisabled'), !controller.get('isSubmittable'), 'button is enabled when form is submittable');
});

test('form cannot be submitted with invalid input', function(assert) {
  const controller = this.subject();
  const gram = Ember.Object.create();
  controller.set('gram', gram);

  controller.get('gram').set('imageUrl', '');
  assert.equal(controller.get('isSubmittable'), false, 'form is not submittable without image');
  assert.equal(controller.get('isDisabled'), !controller.get('isSubmittable'), 'button is disabled when form is not submittable');
});
