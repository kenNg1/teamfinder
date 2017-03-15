import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      teams: this.store.findRecord('team', params.team_id),
      players: this.store.findAll('player'),
      messages: this.store.findAll('message'),
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
    sendMessage(params) {
      var newMessage = this.store.createRecord('message',params);
      var team = params.team;
      team.get('messages').addObject(newMessage);
      newMessage.save().then(function(){
        return team.save();
      })
    },
    changeplayer(messages, team){
      var newteammate = this.store.findAll('player').then(function(teammates){

        var filteredTeammates = teammates.filter(function(player){
          return player.get('name') == messages;
        });
        team.get('teammates').push(filteredTeammates[0].get('name'));
        team.save();
      });
    },
  }
});
