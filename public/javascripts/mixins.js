_.mixin({
  renderIfDefined: function(obj, str) {

    var val = obj[str];
    console.log(str);
    console.log(obj);
    return (typeof val !== "undefined") ? val : '';
  }
});