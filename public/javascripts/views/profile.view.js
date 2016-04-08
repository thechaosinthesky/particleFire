ParticleFire.Views.Profile = Backbone.View.extend({

  events: {
    "click .add-io": "addIO"
  },

  initialize: function(options) {
    this.model = options.model;
    this.active = false;
    this.collection = new ParticleFire.Collections.IO([], {profile_id: this.model.id});
    this.listenTo(this.collection,'sync', this.render);

    this.templates = {
      profile: _.template(ParticleFire.Templates.Profile),
      IO: _.template(ParticleFire.Templates.IO)
    }

    this.renderLoader();
  },

  renderLoader: function() {
    var obj = this.model.toJSON();
    this.$el.html(this.templates.profile(obj));
    this.$IOList = this.$('.io-list');
  },

  render: function() {
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
    var obj = model.toJSON();
    this.$IOList.append(this.templates.IO(obj));
  },

  addIO: function() {

  }
});