_.mixin({
  renderIfDefined: function(obj, str) {
    var val = obj[str];
    console.log(str);
    console.log(obj);
    return (typeof val !== "undefined") ? val : '';
  },

  bindFormView: function(view){
  	if(view.model && view.$el){
  		for(var x in view.model.attributes){
  			view.$el.find("[name=" + x + "]").bind("change keyup", function(){
  				var input = $(this);
  				var name = input.attr('name');
  				var obj = {};
  				obj[name] = $(this).val();
  				view.model.set(obj, {silent:true});
  			});
  		}
  	}
  }
});