ParticleFire.Views.IO = Backbone.View.extend({

  typeTemplates: {
    loader: _.template(ParticleFire.Templates.IO_loader),
    trigger: _.template(ParticleFire.Templates.IO_trigger),
    toggle: _.template(ParticleFire.Templates.IO_toggle)
  },

  events: {},

  baseEvents: {
  	"click .cell-io-edit": "editIO",
    "click .io-action": "startAction"
  },

  initialize: function(options) {
    this.model = options.model;
    this.$parentEl = options.$parentEl;
    this.profileView = options.profileView;
    this.type = this.model.get("type");

    this.el = this.typeTemplates['loader'](this.model.toJSON());
    this.$el = $(this.el);
    this.$parentEl.append(this.$el);
    this.$io = this.$el.find("#io-" + this.model.id);

    if(this.model.get('settings')["statusFunction"]){
      var that = this;

      this.model.set({state:true}, {silent:true});
      this.model.loadStatus(function(){
        that.render();
      });
    }
    else{
      this.render();
    }
  },

  render: function() {
    console.log("RENDERNOW");
  	var obj = this.model.toJSON();
    this.$io.html(this.typeTemplates[this.model.get('type')](obj));
    this.events = $.extend({}, this.baseEvents, this.events);
  	this.delegateEvents();

    this.onRender();
  },

  onRender: function() {

  },

  editIO: function() {
  	var obj = {};
  	obj.model = this.model;
    obj.profileView = this.profileView;
  	this.ioEditView = new ParticleFire.Views.IOEdit(obj);
  },

  startAction: function() {
    var that = this;

    if(this.model.get('settings')['requirePin']){
      var pinVerification = new ParticleFire.Views.PinVerification({verifyEvent:"io.submitAction", verifyObject: this});

      pinVerification.on('pinVerification:success', function(){
        that.submitAction();
      });
    }
    else{
      that.submitAction();
    }
  },

  submitAction: function() {
    
  }

});