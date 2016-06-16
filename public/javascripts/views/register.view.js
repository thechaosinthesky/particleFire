ParticleFire.Views.Register = Backbone.View.extend({

  events: {
  	"click .register-submit": "submit"
  },

  initialize: function(options) {
    var user = new ParticleFire.Models.User({});
    this.model = user;
    // Backbone.Validation.bind(this);
    // Backbone.Validation.bind(this, {
    //   model: user
    // });


    this.render();
  },

  render: function() {
    _.bindFormView(this);
  	Backbone.Validation.bind(this);
  },

  submit: function(e) {
    e.preventDefault();

    this.model.validate();
  	if(this.model.isValid()){
      this.$el.submit();

      // this.model.save([],{
      //   success: function(){
      //     window.location = '/control-panel';
      //   },
      //   error: function(model, res){
      //     var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
      //     $.growl.error({message: error});
      //   }
      // });
    }
  }

});