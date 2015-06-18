import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('gram', 'Unit | Model | gram', {
  // Specify the other units that are required for this test.
  needs: []
});

test('receives blob and converts to image metadata', function(assert) {
  let model = this.subject();
  let blob = {
    url: 'url_here.png',
    filename: 'Filename Here'
  };

  Ember.run(function() {
    model.set('blob', blob);
  });

  assert.equal(model.get('imageUrl'), 'url_here.png', 'image\'s url is "url_here.png"');
  assert.equal(model.get('imageFilename'), 'Filename Here', 'image\'s filename is "Filename Here"');
});
