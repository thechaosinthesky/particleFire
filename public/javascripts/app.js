var ParticleFire = {
  App: {},

  init: function(){
    
  },

  initControlPanel: function(options){
    this.App.profiles = new ParticleFire.Collections.Profile([]);
    this.App.controlPanel = new ParticleFire.Views.ControlPanel({el:"#profiles"});
    this.App.router = new ParticleFire.Routers.ControlPanel({});
    // this.App.user = options.user;
    this.App.user = {};
    this.App.user.devices = new Backbone.Collection();
    this.App.user.devices.url = '/account/devices';
    this.App.user.devices.fetch();
  },

  login: function(token){

   // spark.login({accessToken: token}, function(){
   //      var devices = spark.listDevices();
   //      console.log(devices);
   //    });
  },

  properties: {},

  Templates: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {}

};

// ParticleFire.Models.Profile = "test";

