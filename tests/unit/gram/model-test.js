import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gram', 'Unit | Model | gram', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('receives blob and converts to image metadata', function(assert) {
  let model = this.subject();
  let blob = {
    url: 'url_here.png'
  };

  Ember.run(function() {
    model.set('blob', blob);
  });

  assert.equal(model.get('imageUrl'), 'url_here.png', 'image\'s url is "url_here.png"');
});
