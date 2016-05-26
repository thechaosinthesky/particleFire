ParticleFire.Models.IO = Backbone.Model.extend({
  idAttribute: "_id",

	types:[
		{"value":"trigger", "label":"Trigger"},
		{"value":"toggle", "label":"Toggle"},
		{"value":"power_buttons", "label":"Power Buttons"},
		{"value":"reading", "label":"Value Reading"},
		{"value":"video", "label":"Video Feed"}
	],

  defaults: {
    name: '',
    type: null,
    device_name: '',
    input_pin: '',
    output_pin: ''
  },

  url: function() {
    return '/ios';
  },

  initialize: function() {

  },

  triggerAction: function(value) {
    $.ajax({
      url: "/ios/" + this.id,
      method: "POST",
      body: {"value":value}
    });
  }
});

ParticleFire.Collections.IO = Backbone.Collection.extend({
  model: ParticleFire.Models.IO,
  url: function() {
    return '/ios?profile_id=' + this.profile_id;
    // return '/profiles/' + this.profile_id + '/io';
  },
  initialize: function(array, options) {
  	this.profile_id = options.profile_id;
  }
});