ParticleFire.Views.Profile = Backbone.View.extend({

  events: {
    "click .add-io": "addIO"
  },

  initialize: function(options) {
    this.model = options.model;
    this.active = false;
    this.collection = new ParticleFire.Collections.IO([], {profile_id: this.model.id});
    this.listenTo(this.collection, 'sync', this.renderIOs);
    this.ioViews = [];

    this.templates = {
      profile: _.template(ParticleFire.Templates.Profile),
      IO: _.template(ParticleFire.Templates.IO)
    };

    // this.renderLoader();

    this.render();
  },

  // renderLoader: function() {
  //   var obj = this.model.toJSON();
  //   this.$el.html(this.templates.profile(obj));
  //   this.$IOList = this.$('.io-list');
  // },



  render: function() {
    var obj = this.model.toJSON();
    this.$el.html(this.templates.profile(obj));
    this.$IOList = this.$('.io-list');

    if(obj.ios){
      this.collection.set(obj.ios);

  //     this.collection.set([{
  //   "id": 1,
  //   "name": "Garage",
  //   "type": "trigger",
  //   "device_name": "Aragon"
  // },
  // {
  //   "id": 2,
  //   "name": "Garage2",
  //   "type": "trigger",
  //   "device_name": "Aragon2"
  // }]);

      this.renderIOs();
    }
  },

  renderIOs: function() {

    this.$IOList.html('');
    if(this.collection.length > 0){
      this.renderAllIOs();
    }
  },

  activate: function() {
    this.active = true;
    this.loadIOs();
  },

  loadIOs: function() {
    this.collection.fetch();
  },

  renderAllIOs: function(){
    var that = this;
    _.each(this.collection.models, function(model){
      that.renderIO(model);
    }); 
  },

  renderIO: function(model){
    this.ioViews.push(new ParticleFire.Views["IO_" + model.get('type')]({model: model, $parentEl:this.$IOList, profileView: this}));

    // var obj = model.toJSON();
    // this.$IOList.append(this.templates.IO(obj));
  },

  addIO: function() {
    var obj = {};
    obj.model = new ParticleFire.Models.IO({"profile_id":this.model.id});
    obj.profileView = this;
    this.ioEditView = new ParticleFire.Views.IOEdit(obj);
  }
});