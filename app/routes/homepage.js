import Ember from 'ember';

export default Ember.Route.extend({
  credentials: Ember.inject.service('credentials'),
  model() {
    return Ember.RSVP.hash({
      teams: this.store.findAll('team'),
      players: this.store.findAll('player'),
      basketball: this.store.query('team', {
        orderBy: 'category',
        equalTo: 'basketball'
      }),
      gym: this.store.query('team', {
        orderBy: 'category',
        equalTo: 'gym'
      }),
      football: this.store.query('team', {
        orderBy: 'category',
        equalTo: 'football'
      })
    });
  },
  actions: {
    transTo(isplayer, params) {
      if (isplayer === true) {
        this.transitionTo('player', params);
      } else {
        this.transitionTo('team', params);
      }
    }
  }
});
