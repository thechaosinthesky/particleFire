ParticleFire.Views.ControlPanel = Backbone.View.extend({
  events: {
    "click .add-profile": "addProfile"
  },

  initialize: function() {
    this.$profileList = this.$('.profile-list');
    this.collection = ParticleFire.App.profiles;
    this.listenTo(this.collection,'sync', this.render);

    this.render();
  },

  render: function() {
    if(this.collection.length > 0){
      this.renderAllProfiles();
    }
    else{
      this.$profileList.html(ParticleFire.Templates.Loader);
    }
  },

  renderAllProfiles: function(){
    var that = this;
    _.each(this.collection, function(model){
      that.renderProfile(model);
    }); 
  },

  renderProfile: function(model){
    this.$('.profile-list').append('<div>COOOOOl</div>');
  },

  addProfile: function() {
  }
});