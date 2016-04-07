ParticleFire.Models.Profile = Backbone.Model.extend({
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