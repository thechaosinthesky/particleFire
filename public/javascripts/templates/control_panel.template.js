ParticleFire.Templates.Loader = '<span>LOADING&nbsp;&nbsp;&nbsp;<i class="fa fa-fire fa-spin"></i></span>';

ParticleFire.Templates.Loader_Profiles = '<li class="active"><a>LOADING</a></li> <li><a><span><i class="fa fa-fire fa-spin"></i></span></a></li>';

ParticleFire.Templates.Modal = '
<div class="modal in" tabindex="-1" role="dialog" aria-labelledby="Modal Dialog">\
  <div class="modal-dialog modal-lg">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
          <h4 class="modal-title" id="modal"><%= header %></h4>\
      </div>\
      <div class="modal-body"> </div>\
      <div class="modal-footer"> <div class="modal-buttons"> <button class="pull-right btn btn-primary">SAVE</button> <button class="pull-right btn btn-default">CANCEL</button> </div> </div> </div> </div> </div>\
';

ParticleFire.Templates.ProfileTab = '
<li class="<%= classes %>" role="presentation">\
<a href="#<%= profile_content_id %>" aria-controls="#<%= profile_content_id %>" role="tab" data-toggle="tab">\
<%= name %>\
</a>\
</li>\
';

ParticleFire.Templates.NoProfiles = '
<div class="well">\
<p>You haven\'t added any profiles yet.</p>\
</div>\
';

ParticleFire.Templates.TabProfileContent = '
<div role="tabpanel" class="tab-pane <%= classes %>" id="<%= profile_content_id %>">\
</div>\
';

ParticleFire.Templates.Profile = '
<table id="ios" class="table table-striped">\
  <tbody class="io-list">\
    <tr>\
      <td class="cell-io-name active"> <i class="fa fa-gg"></i>&nbsp;&nbsp;\
        LOADING\
      </td>\
      <td class="cell-io-content"><span><i class="fa fa-fire fa-spin"></i></span></td>\
    </tr>\
  </tbody>\
  <tfoot>\
    <tr>\
      <td class="cell-io-name cell-io-new text-center">\
        <div class="io-new">\
          <div id="newIO" class="btn-new-io btn btn-primary"><i class="fa fa-plus-circle"></i>&nbsp;\
            I/O\
          </div>\
        </div>\
      </td>\
      <td class="cell-io-content"> </td>\
    </tr>\
  </tfoot>\
</table>\
';

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


