ParticleFire.Views.IO = Backbone.View.extend({

  events: {
  	"click .cell-io-edit": "editIO"
  },

  initialize: function(options) {
    this.model = options.model;
    this.$parentEl = options.$parentEl;

    this.templates = {
      IO: _.template(ParticleFire.Templates.IO)
    }

    this.render();
  },

  render: function() {
  	var obj = this.model.toJSON();
  	this.el = this.templates.IO(obj);
  	this.$el = $(this.el);
  	this.$parentEl.append(this.$el);
  	this.delegateEvents();
  },

  editIO: function() {
  	var obj = {};
  	obj.model = this.model;
  	this.ioEditView = new ParticleFire.Views.IOEdit(obj);
  }
});