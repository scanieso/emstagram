import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  grams: hasMany('user', { async: true }),
  username: attr('string')
});
