ParticleFire.Views.IOEdit = ParticleFire.Views.Modal.extend({

  contentTemplate: _.template(ParticleFire.Templates.IOEditContent),

  ioTypeTemplates: {
    trigger: _.template(ParticleFire.Templates.IOEditType_trigger),
    toggle: _.template(ParticleFire.Templates.IOEditType_toggle),
    power_buttons: _.template(ParticleFire.Templates.IOEditType_trigger),
    reading: _.template(ParticleFire.Templates.IOEditType_trigger),
    video: _.template(ParticleFire.Templates.IOEditType_trigger)
  },

  events: {
    'click .btn-save': 'saveIO',
  },

  initialize: function(options) {
    this.model = options.model;
    this.headerText = "New IO";

    if(this.model.id){
      this.headerText = "Edit IO";
    }

    this.header = '<span><i class="fa fa-gg"></i>&nbsp;&nbsp;' + this.headerText + '</span>';

    this.render(this.model.toJSON());
  },

  onRender: function(options) {
    this.$ioFields = $('.modal.in .io-type-fields');
    this.typesDropdown = new BootstrapSelect({el: '.modal.in .io-types-select', values: this.model.types, value: this.model.get("type")});
    this.typesDropdown.bind('change', this.renderIOFields, this);
    this.delegateEvents();
  },

  renderIOFields: function(type) {
    this.$ioFields.html(this.ioTypeTemplates[type](this.model.toJSON()));
    this.deviceDropdown = new BootstrapSelect({el: '.modal.in .io-devices-select', values: ParticleFire.App.user.devices.toJSON(), labelAttribute:"external_id", valueAttribute:"_id"});
  },

  saveIO: function() {
    var that = this;
    var obj = {};

    $('.modal.in form input,.modal.in form select').each(function(){
      var $input = $(this);
      console.log("SAVE2");
      console.log($input);
      var value = $input.val();
      console.log(value);
      if(value && $.trim(value) != ''){
        obj[$input.attr('name')] = value;
      }
    });


    this.model.set(obj);
    
    this.model.save([], {
      success: function(model, res){
        that.close();

      },
      error: function(model, res){
        var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
        $.growl.error({message: error});
      }
    });

  }

});