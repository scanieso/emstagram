import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate() {
      const data = this.getProperties('identification', 'password');
      return this.get('session').authenticate('simple-auth-authenticator:devise', data).then(function() {}, (error) => {
        this.set('loginErrorMessage', error.message);
      });
    },

    sampleLogin() {
      this.set('identification', 'harrypotter@gmail.com');
      this.set('password', 'hedwig123');
      this.send('authenticate');
    }
  }
});
