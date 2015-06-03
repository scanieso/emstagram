import DS from 'ember-data';

const { Model, attr } = DS;

export default DS.Model.extend({
  likes: attr('number', { defaultValue: 0 }),
  title: attr('string')
});
