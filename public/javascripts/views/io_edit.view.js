ParticleFire.Views.IOEdit = ParticleFire.Views.Modal.extend({

  contentTemplate: _.template(ParticleFire.Templates.IOEditContent),

  ioTypeTemplates: {
    // trigger: _.template(ParticleFire.Templates.IOEditType_trigger),
    toggle: _.template(ParticleFire.Templates.IOEditType_toggle),
    status: _.template(ParticleFire.Templates.IOEditType_trigger)
    // power_buttons: _.template(ParticleFire.Templates.IOEditType_trigger),
    // reading: _.template(ParticleFire.Templates.IOEditType_trigger),
    // video: _.template(ParticleFire.Templates.IOEditType_trigger)
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
    var device_id = null;
    if(!this.model.isNew()){
      $('.modal.in .btn-delete').removeClass('hidden');
      device_id = this.model.get('device_id');
      this.renderIOFields(this.model.get('type'));
    }
    this.$ioFields = $('.modal.in .io-type-fields');

    this.model.devaultValidation = this.model.validation;
    _.bindFormView(this);
    Backbone.Validation.bind(this);

    this.deviceDropdown = new BootstrapSelect({el: '.modal.in .io-devices-select', value: device_id, values: ParticleFire.App.user.devices.toJSON(), labelAttribute:"external_id", valueAttribute:"_id"});
    this.typesDropdown = new BootstrapSelect({el: '.modal.in .io-types-select', values: this.model.types, value: this.model.get("type"), valueAttribute:"name"});
    this.typesDropdown.bind('change', this.renderIOFields, this);
    this.delegateEvents();
  },

  renderIOFields: function(typeName) {
    var type = _.find(this.model.types, function(type){
      return type.name == typeName;
    });

    this.model.set({"settings": type.settings}, {silent:true});
    this.model.validation.settings = type.settingsValidation;



    // console.log("TESTTEST");
    // console.log(type);
    // console.log(this.model.toJSON());
    this.$ioFields.html(this.ioTypeTemplates[typeName](type.settings));


    this.model.validation = $.extend({}, this.model.defaultValidation, type.settingsValidation)
    this.bindSettingsForm();
    Backbone.Validation.bind(this);

    // this.deviceDropdown = new BootstrapSelect({el: '.modal.in .io-devices-select', value: value, values: ParticleFire.App.user.devices.toJSON(), labelAttribute:"external_id", valueAttribute:"_id"});
  },

  bindSettingsForm: function() {
    var that = this;
    for(var x in this.model.get('settings')){
        this.$ioFields.find("[name='settings." + x + "']").bind("change keyup", function(){
          var input = $(this);
          var name = input.attr('name');
          var obj = that.model.get('settings');
          obj[name] = $(this).val();
          that.model.set({"settings": obj}, {silent:true});
        });
      }
  },

  saveIO: function() {
    var that = this;
    var obj = {};

    // $('.modal.in form input,.modal.in form select').each(function(){
    //   var $input = $(this);
    //   var value = $input.val();
    //   if(value && $.trim(value) != ''){
    //     obj[$input.attr('name')] = value;
    //   }
    // });
    // this.model.set(obj);

console.log(this.model);

    this.model.validate();
    if(this.model.isValid()){
      // alert('valid');
      // this.model.save([], {
      //   success: function(model){
      //     ParticleFire.App.profiles.add(model, {merge:true});
      //     that.close();
      //   },
      //   error: function(model, res){
      //     var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
      //    $.growl.error({message: error});
      //   }
      // });
    }
    
    // this.model.save([], {
    //   success: function(model, res){
    //     that.profileView.collection.add(model, {merge:true});
    //     $.growl.success({message: "Succesfully saved."});
    //     that.close();
    //   },
    //   error: function(model, res){
    //     var error = res.responseJSON ? res.responseJSON.error : "There was an error saving. Please try again.";
    //     $.growl.error({message: error});
    //   }
    // });

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