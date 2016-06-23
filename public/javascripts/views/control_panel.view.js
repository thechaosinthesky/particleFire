ParticleFire.Views.ControlPanel = Backbone.View.extend({

  events: {
    "click .add-profile": "addProfile",
    "click .profile-list li": "activateProfile",
    "click .delete-profile": "deleteProfile"
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
    };

    this.$profileList.html(ParticleFire.Templates.Loader_Profiles);
  },

  render: function() {
    this.$profileList.html('');
    if(this.collection.length > 0){
      $('.delete-profile').removeClass('hidden');
      this.activeProfile = this.collection.at(0);
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
    this.delegateEvents();
  },

  renderProfile: function(model){
    var obj = model.toJSON();
    var profileContentId = "profile-" + model.id;
    var active = (model.id == this.profile_id);
    obj["profile_id"] = model.id;
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

  activateProfile: function(e) {
    var $el = $(e.currentTarget);

    var profileId = $el.attr('data-profile-id');
    var profile = this.collection.find(function(profile){
      return profile.id == profileId;
    });
    this.activeProfile = profile;
    console.log($el.attr('data-profile-id'));
    console.log(profile);

    if($el.hasClass('active')){
      this.editProfile(profile);
    }
    else{
      var profileViewId = $el.attr('data-profile-view-id');
      var profileView = _.find(this.profileViews, function(view){
        return view.el.id == profileViewId;
      });
      profileView.activate();
    }
  },

  addProfile: function() {
    this.profileEditView = new ParticleFire.Views.ProfileEdit({model: new ParticleFire.Models.Profile()});
  },

  editProfile: function(model) {
    this.profileEditView = new ParticleFire.Views.ProfileEdit({model: model});
  },

  deleteProfile: function() {
    if(confirm("Are you sure you want to delete the profile: '" + this.activeProfile.get('name') + "'")){
      this.activeProfile.destroy({
        success: function(model, res){
          // that.profileView.collection.add(model, {merge:true});
          $.growl.notice({message: "Succesfully deleted."});
          that.close();
        },
        error: function(model, res){
          var error = res.responseJSON ? res.responseJSON.error : "There was an error deleting. Please try again.";
          $.growl.error({message: error});
        }
      });
    }
  }
});