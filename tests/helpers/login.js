import Ember from 'ember';
import DS from 'ember-data';

const { RSVP, Test, run } = Ember;
const { PromiseObject } = DS;

export default Test.registerAsyncHelper('login', function(app) {
  const applicationRoute = app.__container__.lookup('route:application');

  let currentUser;
  run(function() {
    currentUser = PromiseObject.create({
      promise: new RSVP.Promise(function(resolve, reject) {
        resolve(applicationRoute.store.createRecord('user', {
          username: 'scanieso'
        }));
      })
    });
  });

  authenticateSession();
  currentSession().set('currentUser', currentUser);
});
