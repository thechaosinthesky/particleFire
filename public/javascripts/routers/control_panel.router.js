ParticleFire.Routers.ControlPanel = Backbone.Router.extend({

  routes: {
    "control-panel": "loadProfiles"   // #help
    // "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  initialize: function(options) {
    this.profile_id = null;
    this.io_id = null;
    
    Backbone.history.start();
    this.navigate("control-panel");
  },

  loadProfiles: function() {
    ParticleFire.App.profiles.fetch();
  }

});