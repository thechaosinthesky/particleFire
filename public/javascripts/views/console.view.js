
app.Console.view  = function() {
    var profiles = app.Console.vm.profiles;

    var elements = [];
    if(profiles.length > 0){
        elements = [
            m("button.btn.btn-primary.pull-right", [
                m("i.fa.fa-plus-circle"),
                "PROFILE"
            ]), 
            m("ul.nav.nav-tabs", [
                profiles.map(function(item, index) {
                    var tabName = "profile" + index;
                    return m("li", {role: "presentation", class: item.selected ? 'active' : ''}, [
                        m("a", {role: "tab", "data-toggle": "tab", "aria-controls": tabName}, item.name)
                    ])    
                })
            ]),
            m("div", {class:"tab-content"}, [
                profiles.map(function(item, index) {
                    var tabName = "profile" + index;
                    return m("div", {id: tabName, role: "tabpanel", class: "tab-pane" + (item.selected ? ' active' : '')}, [
                        m("a", {role: "tab", "data-toggle": "tab", "aria-controls": tabName}, item.name)
                    ])    
                })
            ])
        ]
    }
    else{
        elements = [
            m("div", {class:"loading"}, "Loading")
        ]
    }

    return m("div#profiles", [
        m("div.profile-tabs", elements)
    ]);
};