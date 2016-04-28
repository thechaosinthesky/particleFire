ParticleFire.Templates.IO = '
<tr>\
  <td class="cell-io-name cell-io-edit active">\
    <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
    <span class="io-edit pull-right"><i class="fa fa-pencil"></i></span>\
  </td>\
  <td id="<%= id %>" class="cell-io-content">Open/Closed</td>\
</tr>\
';

ParticleFire.Templates.IOEditContent = '
<form class="form-horizontal">\
  <div class="form-group">\
    <label for="io-name" class="col-sm-2 control-label">I/O Name:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" id="io-name" value="<%= name %>">\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="io-type" class="col-sm-2 control-label">I/O Type:</label>\
    <div class="col-sm-10">\
      <select id="io-type" class="form-control io-types-select"></select>\
    </div>\
  </div>\
  <div class="io-type-fields">\
  </div>\
</form>\
';

ParticleFire.Templates.IOEditType_trigger = '
<div class="form-group">\
  <label for="io-device-name" class="col-sm-2 control-label">Device Name:</label>\
  <div class="col-sm-10">\
    <input type="input" class="form-control" id="io-device-name" value="<%= device_name %>">\
  </div>\
</div>\
<div class="form-group">\
  <label for="io-device-name" class="col-sm-2 control-label">Input ID:</label>\
  <div class="col-sm-10">\
    <input type="input" class="form-control" id="io-input-pin" value="<%= input_pin %>" placeholder="Example: A6">\
  </div>\
</div>\
';

ParticleFire.Templates.IOEditType_toggle = '
<div class="form-group">\
  <label for="io-device-name" class="col-sm-2 control-label">Device Name:</label>\
  <div class="col-sm-10">\
    <input type="input" class="form-control" id="io-device-name" value="<%= device_name %>">\
  </div>\
</div>\
<div class="form-group">\
  <label for="io-device-name" class="col-sm-2 control-label">Input ID:</label>\
  <div class="col-sm-10">\
    <input type="input" class="form-control" id="io-input-pin" value="<%= input_pin %>" placeholder="Example: A6">\
  </div>\
</div>\
';