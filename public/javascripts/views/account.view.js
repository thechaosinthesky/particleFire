ParticleFire.Views.Account = Backbone.View.extend({

  events: {
  	"click .form-submit": "submit",
    "keypress": "onKeyPress"
  },

  initialize: function(options) {
    if(options.model){
      this.model = options.model;
    }
    else{
      this.model = new ParticleFire.Models.User({});
    }
    
    this.render();
  },

  render: function() {
    _.bindFormView(this);
  	Backbone.Validation.bind(this);
  },

  onKeyPress: function(e){
    if (e.keyCode == 13) {
      e.preventDefault();
      this.submit(e);
    }
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