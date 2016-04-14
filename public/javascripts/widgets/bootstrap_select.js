var BootstrapSelect = Backbone.View.extend({

  labelAttribute: 'label',
  valueAttribute: 'value',

  events: {
  	"change": "onChange"
  },

  initialize: function(options) {
    this.values = options.values;
    this.value = options.value;

    this.render();
  },

  render: function() {
    if(!this.value){
      this.$el.append('<option class="selection"> - SELECT - </option>');
    }
    for(var x in this.values){
      var value = this.values[x];
      var selected = value == this.value;
      this.$el.append('<option class="selection" ' + (selected ? 'selected' : '') + ' value="' + value[this.valueAttribute] + '">' + value[this.labelAttribute] + '</option>');
    }
  },

  onChange: function(e) {
  	this.trigger('change', this.$el.val());
  }
});