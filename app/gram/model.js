import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  likes: attr('number', { defaultValue: 0 }),
  image: attr('string'),
  title: attr('string')
});
