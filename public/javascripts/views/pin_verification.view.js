ParticleFire.Views.PinVerification = ParticleFire.Views.Modal.extend({

  contentTemplate: _.template(ParticleFire.Templates.PinVerification),

  events: {
    'click .btn-save': 'submitVerification'
  },

  initialize: function(options) {
    this.model = ParticleFire.App.user;
    this.headerText = "Pin Verification"
    this.header = '<span><i class="fa fa-gg"></i>&nbsp;&nbsp;' + this.headerText + '</span>';

    var obj = this.model.toJSON();
    obj["submitLabel"] = "SUBMIT"
    this.render(obj);
  },

  onRender: function() {
    setTimeout(function() { $('.modal.in #user-pin').focus() }, 0);
    _.bindFormView(this);
    Backbone.Validation.bind(this);
  	this.delegateEvents();
  },

  onEnterPress: function(e) {
    this.submitVerification();
  },

  submitVerification: function() {
    var that = this;
  	
    this.model.validate();
    if(this.model.isValid()){
      this.model.save([], {
        url: '/account/verifyPin',
        complete: function(res){
          if(res.status == 200){
            that.trigger("pinVerification:success");
            that.close();
          }
          else{
            var error = "Incorrect pin.";
            $.growl.error({message: error});
          }
        }
      });
    }
  }

});