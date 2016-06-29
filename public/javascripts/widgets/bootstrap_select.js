var BootstrapSelect = Backbone.View.extend({

  defaultOptions: {
    labelAttribute: 'label',
    valueAttribute: 'value'
  },
  

  events: {
  	"change": "onChange"
  },

  initialize: function(options) {
    this.values = options.values;
    this.value = options.value;
    this.options = $.extend({}, this.defaultOptions, options);

    this.render();
  },

  render: function() {
    if(!this.value){
      this.$el.append('<option class="selection"> - SELECT - </option>');
    }
    for(var x in this.values){
      var value = this.values[x];
      var optionValue = value[this.options.valueAttribute];
      var optionLabel = value[this.options.labelAttribute];
      var selected = (optionValue == this.value) && this.value;
      this.$el.append('<option class="selection" ' + (selected ? 'selected' : '') + ' value="' + optionValue + '">' + optionLabel + '</option>');
    }
  },

  onChange: function(e) {
  	this.trigger('change', this.$el.val());
  }
});