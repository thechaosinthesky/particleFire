ParticleFire.Views.ControlPanel = Backbone.View.extend({

  events: {
    "click .add-profile": "addProfile"
  },

  initialize: function() {
    this.$profileList = this.$('.profile-list');
    this.collection = ParticleFire.App.profiles;
    this.listenTo(this.collection,'sync', this.render);

    this.templates = {
      profileTab: _.template(ParticleFire.Templates.ProfileTab)
    }

    this.render();
  },

  render: function() {
    if(this.collection.length > 0){
      this.$profileList.html('');
      this.renderAllProfiles();
    }
    else{
      this.$profileList.html(ParticleFire.Templates.Loader);
    }
  },

  loadProfiles: function() {
    this.collection.fetch();
  },

  renderAllProfiles: function(){
    var that = this;
    _.each(this.collection.models, function(model){
      that.renderProfile(model);
    }); 
  },

  renderProfile: function(model){
    this.$('.profile-list').append(this.templates.profileTab(model.toJSON()));
  },

  addProfile: function() {
  }
});