app.Console = {};

app.Console.Profile = function(data) {
    this.id = m.prop(data.id);
    this.index = m.prop(data.index);
    this.selected = m.prop(data.selected);
};
app.Console.ProfileList = Array;

// app.Console.IO = function(data) {
//     this.testy = m.prop(data.testy);
//     this.type = m.prop(data.type);
//     this.value = m.prop(data.value);
// };
// app.Console.IOList = Array;

app.Console.vm = {
	init: function(){
		console.log("HI");
		
		this.profiles = new app.Console.ProfileList();

		var that = this;
		// this.profiles = m.prop([]);
		// this.ios = m.prop([]);

		setTimeout(function(){
			that.profiles.push(new app.Console.Profile({name:"Home", id: 3, index:1 , selected: true}));
			// m.render(document.getElementById("main"), {controller: App.Console.controller, view: App.Console.view});
		}, 2000);

		console.log(this);

		// setTimeout(function(){
		// 	that.profiles.[0].name("NEATO");
		// 	// m.render(document.getElementById("main"), {controller: App.Console.controller, view: App.Console.view});
		// }, 4000);

	}
};