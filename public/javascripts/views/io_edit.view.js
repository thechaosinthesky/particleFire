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

  },

  renderIOFields: function(type) {
    this.$ioFields.html(this.ioTypeTemplates[type](this.model.toJSON()));
  }

});