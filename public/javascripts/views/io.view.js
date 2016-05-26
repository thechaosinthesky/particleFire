ParticleFire.Views.IO = Backbone.View.extend({

  typeTemplates: {
    trigger: _.template(ParticleFire.Templates.IO_trigger)
  },

  events: {
  	"click .cell-io-edit": "editIO",
    "click .io-trigger": "triggerAction"
  },

  initialize: function(options) {
    this.model = options.model;
    this.$parentEl = options.$parentEl;

    this.render();
  },

  render: function() {
  	var obj = this.model.toJSON();
  	this.el = this.typeTemplates[this.model.get('type')](obj);
  	this.$el = $(this.el);
  	this.$parentEl.append(this.$el);
  	this.delegateEvents();
  },

  editIO: function() {
  	var obj = {};
  	obj.model = this.model;
  	this.ioEditView = new ParticleFire.Views.IOEdit(obj);
  },

  triggerAction: function() {
    this.model.triggerAction();
  }

});