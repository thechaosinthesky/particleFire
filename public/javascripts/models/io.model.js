ParticleFire.Models.IO = Backbone.Model.extend({
  idAttribute: "_id",

	types:[
		// {"value":"trigger", "label":"Trigger"},
		{
      "name":"toggle", 
      "label":"Toggle Switch",
      "settings": {
        "action":"triggerPulse", 
        "statusFunction":"digitalRead",
        "actionPin":"D0",  
        "statusPin":"D1",
        "onLabel":"On",
        "offLabel":"Off"
      },
      "settingsValidation": {
        'settings.action': {
          required: true,
          msg: 'Please enter an action name. The action is the function to execute on your device.'
        }
      }
    },
    {
      "name":"status",
      "label":"Status",
      "settings": {
        "statusFunction":"digitalRead",
        "statusPin":"D1",
        "onLabel":"On",
        "offLabel":"Off"
      },
      "settingsValidation": {

      }
    }
		// {"value":"power_buttons", "label":"Power Buttons"},
		// {"value":"analog_output", "label":"Measurement"}
		// {"value":"video", "label":"Video Feed"}
	],

  defaults: {
    name: '',
    type: null,
    device_id: '',
    settings: {}
  },

  validation: {
    name: {
      required: true,
      msg: 'Please enter a name.'
    },
    type: {
      required: true,
      msg: 'Please select an IO type.'
    },
    device_id: {
      required: true,
      msg: 'Please select a device.'
    }
  },

  url: function() {
    var base = '/ios';
    if(this.id){
      base += '/' + this.id;
    }
    return base;
  },

  initialize: function() {

  },

  triggerAction: function(value) {
    $.ajax({
      url: "/ios/" + this.id,
      method: "POST",
      body: {"value":value}
    });
  },

  // types:[
  //   {
  //     "name":"garage", 
  //     "label":"Garage Door",
  //     "uiType":"toggle", 
  //     "action":"triggerPulse", 
  //     "statusFunction":"digitalRead",
  //     "actionPin":"D0",  
  //     "statusPin":"D1",
  //     "onLabel":"On",
  //     "offLabel":"Off"
  //   },
  //   {
  //     "name":"status", 
  //     "label":"Status",
  //     "uiType":"status", 
  //     "statusFunction":"digitalRead",
  //     "statusPin":"D1",
  //     "onLabel":"On",
  //     "offLabel":"Off"
  //   },
  //   {
  //     "name":"tempetature", 
  //     "label":"Temperature",
  //     "uiType":"analog_output", 
  //     "statusFunction":"analogRead",
  //     "statusPin":"A1",
  //     "unitsLabel":"Degrees F"
  //   }
  // ]
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