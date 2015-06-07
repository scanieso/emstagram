import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  image: attr('string'),
  liked: attr('boolean', { defaultValue: false }),
  likesCount: attr('number', { defaultValue: 0 }),
  title: attr('string', { defaultValue: '' }),
  user: attr('string')
});
