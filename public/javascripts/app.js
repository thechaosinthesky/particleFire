var ParticleFire = {
  App: {},

  init: function(){
    
  },

  initControlPanel: function(options){
    this.App.profiles = new ParticleFire.Collections.Profile([]);
    this.App.controlPanel = new ParticleFire.Views.ControlPanel({el:"#profiles"});
    this.App.router = new ParticleFire.Routers.ControlPanel({});
    this.App.user = options.user;
    // this.App.user = {};
    // this.App.user.devices = new Backbone.Collection();
    // this.App.user.devices.url = '/account/devices';
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

// Handle backbone form validation, with popovers
_.extend(Backbone.Validation.callbacks, {
  valid: function(view, attr, selector) {
    var input = view.$el.find("[name='" + attr + "']");
    var formGroup = input.closest('.form-group');
    if(formGroup.length){
      formGroup.removeClass('has-error');
    }
    input.popover('destroy');
  },
  invalid: function(view, attr, error, selector) {
    var input = view.$el.find("[name='" + attr + "']");
    var formGroup = input.closest('.form-group');
    if(formGroup.length){
      formGroup.addClass('has-error');
    }
    var errorMethod = input.attr('data-error-method');
    if(errorMethod == 'growl'){
      $.growl.error({message: error});
    }
    else{
      var placement = input.attr('data-error-placement');
    if(!placement){
      placement = 'auto';
    }
    input.popover({content:error, placement:placement}).popover('show');
    }
  }
});

