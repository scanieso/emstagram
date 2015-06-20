import Ember from 'ember';

import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:grams/index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

const GRAMS = [Ember.Object.create({
  id: 1,
  createdAt: new Date('01/01/14'),
  user: 'middle_user'
}), Ember.Object.create({
  id: 2,
  createdAt: new Date('01/01/13'),
  user: 'last_user'
}), Ember.Object.create({
  id: 3,
  createdAt: new Date('01/01/15'),
  user: 'first_user'
})];

test('it properly sorts the grams', function(assert) {
  const controller = this.subject();
  controller.set('model', GRAMS);

  const firstGram = controller.get('grams').objectAt(0);
  assert.equal(firstGram.get('user'), 'first_user', 'newest gram displays first');

  const lastGram = controller.get('grams').objectAt(2);
  assert.equal(lastGram.get('user'), 'last_user', 'oldest gram displays last');
});
