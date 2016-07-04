ParticleFire.Views.Modal = Backbone.View.extend({

	header: "Great template",
	contentTemplate: _.template("Hi, How ya doin?"),
	modalTemplate: _.template(ParticleFire.Templates.Modal),
  type: 'form',

  events: {
  },

  initialize: function(options) {
    this.render();
  },

  render: function(contentObj) {
    var that = this;
  	var obj = {};
  	obj.header = this.header;
    obj.submitLabel = contentObj.submitLabel ? contentObj.submitLabel : "SAVE"
  	this.$content = $(this.modalTemplate(obj));
  	this.$modalBody = this.$content.find('.modal-body');
  	this.$modalBody.html(this.contentTemplate(contentObj));

  	this.$content.modal();
    this.$el = this.$content;

    this.$el.find('.btn-cancel').click(function(){
      that.$content.modal('hide');
    });

    this.$el.bind('keypress', function(e){
      if (e.keyCode == 13) {
        e.preventDefault();
        that.onEnterPress(e);
      }
    });

  	this.onRender();
  },

  onRender: function() {

  },

  onEnterPress: function() {

  },

  close: function() {
    this.$content.modal('hide');
  }
});