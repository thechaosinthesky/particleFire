ParticleFire.Models.IO = Backbone.Model.extend({
  initialize: function() {

  }
});

ParticleFire.Collections.IO = Backbone.Collection.extend({
  model: ParticleFire.Models.IO,
  url: function() {
    return '/profiles/' + this.profile_id + '/io';
  },
  initialize: function(options) {
  	this.profile_id = options.profile_id;
  }
});