import DS from 'ember-data';

const { belongsTo } = DS;

export default DS.Model.extend({
  gram: belongsTo('gram', { async: true }),
  user: belongsTo('user', { async: true })
});
