ParticleFire.Models.Profile = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: {
    name: ''
  },

  validation: {
    name: {
      required: true,
      msg: 'Please enter a profile name'
    }
  },

  url: function() {
    var base = '/profiles';
    if(this.id){
      base += '/' + this.id;
    }
    return base;
  },

  initialize: function() {

  }
});

ParticleFire.Collections.Profile = Backbone.Collection.extend({
  model: ParticleFire.Models.Profile,
  url: function() {
    return '/profiles';
  },
  initialize: function() {

  }
});