var ParticleFire = {
  App: {},

  init: function(){
    
  },

  initControlPanel: function(){
    this.App.profiles = new ParticleFire.Collections.Profile([]);
    this.App.controlPanel = new ParticleFire.Views.ControlPanel({el:"#profiles"});
    this.App.router = new ParticleFire.Routers.ControlPanel({});
    console.log(this.App.router);
    // this.App.router.navigate("control-panel", {trigger: true, replace: true});
    // this.App.router.navigate("control-panel");
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

