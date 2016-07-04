ParticleFire.Templates.IO_loader = '
<tr>\
  <td class="cell-io-name cell-io-edit active">\
    <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
    <span class="io-edit pull-right"><i class="fa fa-pencil"></i></span>\
  </td>\
  <td id="io-<%= _id %>" class="cell-io-content"><span>LOADING&nbsp;&nbsp;&nbsp;<i class="fa fa-fire fa-spin"></i></span></td>\
</tr>\
';

ParticleFire.Templates.IO = '
<tr>\
  <td class="cell-io-name cell-io-edit active">\
    <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
    <span class="io-edit pull-right"><i class="fa fa-pencil"></i></span>\
  </td>\
  <td id="<%= _id %>" class="cell-io-content">Open/Closed</td>\
</tr>\
';

ParticleFire.Templates.IO_trigger = '
<tr>\
  <td class="cell-io-name cell-io-edit active">\
    <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
    <span class="io-edit pull-right"><i class="fa fa-pencil"></i></span>\
  </td>\
  <td id="<%= _id %>" class="cell-io-content"><button type="button" class="io-trigger btn btn-danger"><i class="fa fa-lg fa-bolt danger"></i></button></td>\
</tr>\
';

ParticleFire.Templates.IO_toggle = '
<input class="io-toggle io-action" type="checkbox" name="io-<%= _id %>" data-io-type="toggle" data-io-id="<%= _id %>" data-on-text="<%= settings.onLabel %>" data-off-text="<%= settings.offLabel %>" <%= state ? "checked" : "" %> />\
';

ParticleFire.Templates.IO_toggle1 = '
<tr>\
  <td class="cell-io-name cell-io-edit active">\
    <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
    <span class="io-edit pull-right"><i class="fa fa-pencil"></i></span>\
  </td>\
  <td id="<%= _id %>">\
    <input class="io-toggle io-action" type="checkbox" name="io-<%= _id %>" data-io-type="toggle" data-io-id="<%= _id %>" data-on-text="<%= settings.onLabel %>" data-off-text="<%= settings.offLabel %>" checked />
  </td>\
</tr>\
';

ParticleFire.Templates.IOEditContent = '
<form class="form-horizontal">\
  <div class="form-group">\
    <label for="io-name" class="col-sm-2 control-label">I/O Name:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" id="io-name" name="name" data-error-method="growl" value="<%= name %>">\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="io-device-name" class="col-sm-2 control-label">Device:</label>\
    <div class="col-sm-10">\
      <select id="io-device" name="device_id" data-error-method="growl" class="form-control io-devices-select">\
      </select>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="io-type" class="col-sm-2 control-label">I/O Type:</label>\
    <div class="col-sm-10">\
      <select id="io-type" name="type" data-error-method="growl" class="form-control io-types-select"></select>\
    </div>\
  </div>\
  <div class="io-type-fields">\
  </div>\
</form>\
';

ParticleFire.Templates.IOEditType_trigger = '
<div class="form-group">\
  <label for="io-device-name" class="col-sm-2 control-label">Device:</label>\
  <div class="col-sm-10">\
    <select id="io-device" name="device_id" data-error-method="growl" class="form-control io-devices-select">\
    </select>\
  </div>\
</div>\
';

ParticleFire.Templates.IOEditType_toggle = '
<div class="well">\
  <div>\
    <div class="col-sm-10 col-sm-offset-2 text-info">\
      <strong><i class="fa fa-toggle-on"></i>&nbsp;&nbsp; Add a toggle switch for your device.</strong>\
    </div>\
  </div>\
  <h4>Settings</h4>\
  <div class="form-group">\
    <div class="checkbox col-sm-10 col-sm-offset-2">
      <label for="settings-requirePin">
        <input type="checkbox" id="settings-requirePin" name="settings.requirePin" <%= requirePin ? "checked" : "" %> /> Require Pin Validation
      </label>
    </div>
  </div>
  <div class="form-group">\
    <label for="settings-onAction" class="col-sm-2 control-label">Toggle On Action:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-onAction" name="settings.onAction" value="<%= onAction %>" aria-describedby="onAction-help">\
      <span id="onAction-help" class="help-block">\
        The device function to call when the toggle swith is turned on.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-offAction" class="col-sm-2 control-label">Toggle Off Action:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-offAction" name="settings.offAction" value="<%= offAction %>" aria-describedby="offAction-help">\
      <span id="offAction-help" class="help-block">\
        The device function to call when the toggle swith is turned off.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-actionPin" class="col-sm-2 control-label">Device Action Pin:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-actionPin" name="settings.actionPin" value="<%= actionPin %>" aria-describedby="actionPin-help">\
      <span id="actionPin-help" class="help-block">\
        The device pin to perform the action on.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-statusFunction" class="col-sm-2 control-label">Device Status Function:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-statusFunction" name="settings.statusFunction" value="<%= statusFunction %>" aria-describedby="statusFunction-help">\
      <span id="statusFunction-help" class="help-block">\
        The device function to use when reading the status.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-statusPin" class="col-sm-2 control-label">Device Status Pin:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-statusPin" name="settings.statusPin" value="<%= statusPin %>" aria-describedby="statusPin-help">\
      <span id="statusPin-help" class="help-block">\
        The device pin to use when readion the status.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-onLabel" class="col-sm-2 control-label">Active Status Label:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-onLabel" name="settings.onLabel" value="<%= onLabel %>" aria-describedby="onLabel-help">\
      <span id="onLabel-help" class="help-block">\
        The label to display on the toggle switch when the device status is \'active\'.\
      </span>\
    </div>\
  </div>\
  <div class="form-group">\
    <label for="settings-offLabel" class="col-sm-2 control-label">Inactive Status Label:</label>\
    <div class="col-sm-10">\
      <input type="input" class="form-control" data-error-method="growl" id="settings-offLabel" name="settings.offLabel" value="<%= offLabel %>" aria-describedby="offLabel-help">\
      <span id="offLabel-help" class="help-block">\
        The label to display on the toggle switch when the device status is \'inactive\'.\
      </span>\
    </div>\
  </div>\
</div>\
';

ParticleFire.Templates.IOEditType_toggle1 = '
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