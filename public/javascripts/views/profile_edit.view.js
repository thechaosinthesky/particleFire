ParticleFire.Views.ProfileEdit = ParticleFire.Views.Modal.extend({

  contentTemplate: _.template(ParticleFire.Templates.ProfileEditContent),

  events: {
  	'click .btn-save': 'saveProfile',
  	'click .btn-cancel': 'close'
  },

  initialize: function(options) {
    this.model = options.model;
    this.headerText = "New Profile";

    if(this.model.id){
      this.headerText = "Edit Profile";
    }

    this.header = '<span><i class="fa fa-gg"></i>&nbsp;&nbsp;' + this.headerText + '</span>';

    this.render(this.model.toJSON());
  },

  onRender: function() {
  	this.$el.find('#profile-name').focus();
  	this.delegateEvents();
  },

  saveProfile: function() {
    var that = this;
    this.model.set({"name": this.$el.find('#profile-name').val()})
  	
    this.model.save([], {
    	success: function(){
        that.close();
    	},
    	error: function(model, res){
        var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
			 $.growl.error({message: error});
    	}
    });
  }

});