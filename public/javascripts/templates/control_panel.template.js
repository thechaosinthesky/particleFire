ParticleFire.Templates.Loader = '<span>LOADING&nbsp;&nbsp;&nbsp;<i class="fa fa-fire fa-spin"></i></span>';

ParticleFire.Templates.Loader_Profiles = '<li class="active"><a>LOADING</a></li> <li><a><span><i class="fa fa-fire fa-spin"></i></span></a></li>';

ParticleFire.Templates.ProfileTab = '
<li class="<%= classes %>" role="presentation">\
<a href="#<%= profile_content_id %>" aria-controls="#<%= profile_content_id %>" role="tab" data-toggle="tab">
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
  <td class="cell-io-name active"> <i class="fa fa-gg"></i>&nbsp;&nbsp;\
    <%= name %>\
  </td>\
  <td id="<%= id %>" class="cell-io-content">Open/Closed</td>\
</tr>\
';
