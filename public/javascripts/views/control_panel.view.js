ParticleFire.Views.ControlPanel = Backbone.View.extend({

  events: {
    "click .add-profile": "addProfile"
  },

  initialize: function(options) {
    this.profile_id = options.profile_id;
    this.$profileList = this.$('.profile-list');
    this.$profileListContent = this.$('.profile-tab-content');
    this.collection = ParticleFire.App.profiles;
    this.profileViews = [];
    this.listenTo(this.collection,'sync', this.render);

    this.templates = {
      profileTab: _.template(ParticleFire.Templates.ProfileTab),
      profileContent: _.template(ParticleFire.Templates.TabProfileContent)
    }

    this.$profileList.html(ParticleFire.Templates.Loader_Profiles);
  },

  render: function() {
    this.$profileList.html('');
    if(this.collection.length > 0){
      if(!this.profile_id){
        this.profile_id = this.collection.at(0).id;
      }
      this.renderAllProfiles();
    }
    else{
      this.$profileListContent.append(ParticleFire.Templates.NoProfiles);
    }
  },

  loadProfiles: function() {
    var that = this;
    
    this.collection.fetch();
  },

  renderAllProfiles: function(){
    var that = this;
    _.each(this.collection.models, function(model){
      that.renderProfile(model);
    }); 
  },

  renderProfile: function(model){
    var obj = model.toJSON();
    var profileContentId = "profile-" + model.id;
    var active = (obj.id == this.profile_id);
    obj["profile_content_id"] = profileContentId;
    obj["classes"] = active ? 'active' : '';
    obj["active"] = active;
    this.$profileList.append(this.templates.profileTab(obj));
    this.$profileListContent.append(this.templates.profileContent(obj));
    var profileView = new ParticleFire.Views.Profile({el:"#" + profileContentId, model: model});
    this.profileViews.push(profileView); 
    if(active){
      profileView.activate();
    }
  },

  addProfile: function() {
    this.profileEditView = new ParticleFire.Views.ProfileEdit({model: new ParticleFire.Models.Profile()});
  }
});