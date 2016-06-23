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
    'click .btn-delete': 'deleteIO'
  },

  initialize: function(options) {
    this.profileView = options.profileView;
    this.model = options.model;
    this.headerText = "New IO";

    if(!this.model.isNew()){
      this.headerText = "Edit IO";
    }

    this.header = '<span><i class="fa fa-gg"></i>&nbsp;&nbsp;' + this.headerText + '</span>';

    var obj = this.model.toJSON();
    this.render(obj);
  },

  onRender: function(options) {
    if(!this.model.isNew()){
      $('.modal.in .btn-delete').removeClass('hidden');
    }
    this.$ioFields = $('.modal.in .io-type-fields');
    this.typesDropdown = new BootstrapSelect({el: '.modal.in .io-types-select', values: this.model.types, value: this.model.get("type")});
    this.typesDropdown.bind('change', this.renderIOFields, this);
    this.delegateEvents();
    if(!this.model.isNew()){
      this.renderIOFields(this.model.get('type'), this.model.get('device_id'));
    }
  },

  renderIOFields: function(type, value) {
    this.$ioFields.html(this.ioTypeTemplates[type](this.model.toJSON()));
    this.deviceDropdown = new BootstrapSelect({el: '.modal.in .io-devices-select', value: value, values: ParticleFire.App.user.devices.toJSON(), labelAttribute:"external_id", valueAttribute:"_id"});
  },

  saveIO: function() {
    var that = this;
    var obj = {};

    $('.modal.in form input,.modal.in form select').each(function(){
      var $input = $(this);
      var value = $input.val();
      if(value && $.trim(value) != ''){
        obj[$input.attr('name')] = value;
      }
    });

    this.model.set(obj);
    
    this.model.save([], {
      success: function(model, res){
        that.profileView.collection.add(model, {merge:true});
        $.growl.success({message: "Succesfully saved."});
        that.close();
      },
      error: function(model, res){
        var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
        $.growl.error({message: error});
      }
    });

  },

  deleteIO: function() {
    if(confirm("Are you sure you want to delete this IO")){
      this.model.destroy({
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