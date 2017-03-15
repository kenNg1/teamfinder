import Ember from 'ember';

export default Ember.Component.extend({
  credentials: Ember.inject.service(),
  actions: {
    selectUser(player){
      this.get('credentials').addPlayer(player);
    }
  }
});
