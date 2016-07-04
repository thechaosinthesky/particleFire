ParticleFire.Views.IO_toggle = ParticleFire.Views.IO.extend({

  events: {
    "switchChange.bootstrapSwitch input": "prepareAction"
  },

  onRender: function() {
  	this.$input = this.$el.find('input');
    this.$el.find('input').bootstrapSwitch();
  },

  prepareAction: function() {
    var that = this;
    this.$input.bootstrapSwitch('state', this.model.get('state'), true);
    this.startAction();
  },

  submitAction: function() {
    var state = this.model.get('state');
    this.$input.bootstrapSwitch('state', !state, true);
    var settings = this.model.get('settings');
    var actionFunction = state ? settings['onAction'] : settings['offAction'];
    settings['actionFunction'] = actionFunction;
    this.model.set({settings: settings}, {silent:true});
    this.model.triggerAction();
  }

});