ParticleFire.Routers.ControlPanel = Backbone.Router.extend({

  routes: {
    "": "initRoute", 
    "control-panel": "load"   // #help
    // "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  initialize: function(options) {
    Backbone.history.start();
  },

  initRoute: function() {
    this.navigate("control-panel", {trigger: true, replace: true});
  },

  load: function() {
    ParticleFire.App.controlPanel.loadProfiles();
  }

});