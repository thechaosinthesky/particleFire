ParticleFire.Models.IO = Backbone.Model.extend({
  initialize: function() {

  }
});

ParticleFire.Collections.IO = Backbone.Collection.extend({
  model: ParticleFire.Models.IO,
  url: function() {
    return '/profiles/' + this.model.id + '/io';
  },
  initialize: function() {

  }
});