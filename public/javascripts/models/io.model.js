ParticleFire.Models.IO = Backbone.Model.extend({

	types:[
		{"value":"trigger", "label":"Trigger"},
		{"value":"toggle", "label":"Toggle"},
		{"value":"power_buttons", "label":"Power Buttons"},
		{"value":"reading", "label":"Value Reading"},
		{"value":"video", "label":"Video Feed"}
	],

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