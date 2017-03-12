var RESEARCH = {};

var RESEARCH_LIST = [];

function getResearchList(){
	var tmp = [];
	for (var i = 0; i < RESEARCH_LIST.length; i++) {

		if (GAME.researched.indexOf(RESEARCH_LIST[i]) < 0 &&
			GAME.researching.indexOf(RESEARCH_LIST[i]) < 0 &&
			!(RESEARCH_LIST[i].locked)){
			tmp.push(RESEARCH_LIST[i].name);
		}
	};
	return tmp;
}

function lockResearch (s) {
	console.log("locked " + s);
	RESEARCH[s].locked = true;
}

function loadResearch (obj) {
	RESEARCH[obj.name].fromJSON(obj);
}

function unlockResearch(name){
	/* Unlock either the name, or a list of items*/
	if (typeof name == "string"){
		RESEARCH[name].locked = false;
	}
	else {
		for (var i = 0; i < name.length; i++) {
			console.log(name);
			RESEARCH[name[i]].locked = false;
		};
	}
}

function ResearchItem(conf){
	this.name = conf.name || "";
	this.key = conf.key || "mult";
	this.value = conf.value||1;
	this.description = conf.description || "";
	this.time = conf.time||3000;
	this.compensation = conf.compensation || 100;
	this.complete_fn = conf.complete_fn||null;
	this.locked = conf.locked||false;
	this.unlocks = conf.unlocks||"";
	RESEARCH_LIST.push(this);
	RESEARCH[this.name]=this;
}

ResearchItem.prototype.toJSON = function(){
	return {
		name : this.name,
		time : this.time,
		locked : this.locked
	}
}

ResearchItem.prototype.fromJSON = function(obj){
	this.name=obj.name;
	this.time=obj.time;
	this.locked=obj.locked;
}

ResearchItem.prototype.getMaxTime = function() {
	return this.time * 1;
};

ResearchItem.prototype.complete = function() {
	if (this.unlocks != ([] || "")){
		unlockResearch(this.unlocks);
	}
};

new ResearchItem({
	name:"PowerPC",
	description: "Literally triples* your internet speed. *(actually increases it just a tiny bit. But hey! It makes a difference!)",
	value : 0.5,
	unlocks : ["i80 LaunchForce HardDrive","GZip"]
});

new ResearchItem({
	name:"i80 LaunchForce HardDrive",
	key : "storage",
	description : "The i80 LaunchForce HardDrive lets you store an incredible amount of things in a tiny little box. <br> +$1000.00",
	value : 0.1,
	time: 1200000,
	compensation : 1000,
	locked : true,
	unlocks : "High Powered Modems",
});

new ResearchItem({
	name:"GZip",
	key:"storage",
	time: 120000,
	compensation: 15,
	description : "\"I need you to take on this project. I'll pay you in full. I need it now. Now, I said, now!\"",
	value : 0.25,
	locked : true,
	unlocks:"Duh Fing Compaktuh",
});

new ResearchItem({
	name:"Duh Fing Compaktuh",
	description : "Welcome to Duh Fing Compaktuh. All be setting up all of your items, so you, can start playing. You'll have fun. <br> ~~Message complete~~",
	key : "storage",
	value : 0.12,
	time: 47000,
	locked : true,
	compensation : 100
});

new ResearchItem({
	name:"High Powered Modems",
	description : "These modems boast almost 60kbps! The fastest you'll ever find!",
	key : "mult",
	value : 1,
	unlocks : "Hypertext Markup Language",
	locked : true,
	time: 3600000,
	compensation : 3
});

new ResearchItem({
	name:"Second Landline",
	description : "What's better than searching the internet? Searching the internet without someone needing to make a phone call in the middle of a great article!",
	key : "mult",
	value : 1,
	time: 3600000,
	compensation : 1000
});

new ResearchItem({
	name:"Online Piracy",
	description : "What's better than searching the internet? Searching the internet without someone needing to make a phone call in the middle of a great article!",
	key : "mult",
	value : 0,
	time: 3600000,
	compensation : 1000,
	complete_fn : function () {
		lockResearch("Copyright Advocacy");
	}
});

new ResearchItem({
	name:"Copyright Advocacy",
	description : "What's better than searching the internet? Searching the internet without someone needing to make a phone call in the middle of a great article!",
	key : "mult",
	value : 0,
	time: 3600000,
	compensation : 1000,
	complete_fn : function () {
		lockResearch("Online Piracy");
	}
});

new ResearchItem({
	name:"Hypertext Markup Language",
	description : "Research the founding principles of this new language. Maybe it'll come in handy some day. No use for it now though.",
	key : "mult",
	value : 0.1,
	time: 7200000,
	locked : true,
	unlocks : ["Gecko Engine","Intel x86"],
	compensation : 10000
});

new ResearchItem({
	name:"Gecko Engine",
	description : "Remember that Hypertext stuff I talked about, well this makes it useful.",
	key : "storage",
	value : 0.1,
	time: 7200000,
	compensation : 10000,
	locked : true,
	unlocks : "Dillo Engine"
});

new ResearchItem({
	name:"Dillo Engine",
	description : "Well Gecko was reliable, good job. But now we need something more better.",
	key : "mult",
	value : 1,
	time: 14400000,
	unlocks : "Webkit Engine",
	compensation : 10000,
	locked : true,
});

new ResearchItem({
	name:"Webkit Engine",
	description : "The most powerful web engine to be released. Superior content creation. Beautiful page rendering. It's Webkit.",
	key : "mult",
	value : 1,
	time: 14400000,
	unlocks : ["Blink Engine","HTML5"],
	compensation : 10000,
	locked : true,
});

new ResearchItem({
	name:"Blink Engine",
	description : "Well all that Webkit stuff was shite, now wasn't it. Now it will look it at least.",
	key : "storage",
	value : 0.1,
	time: 14400000,
	compensation : 10000,
	locked : true,
});

new ResearchItem({
	name:"HTML5",
	description : "Remember that Hypertext stuff I talked about? Well this is better.",
	key : "mult",
	value : 1,
	time: 14400000,
	compensation : 10000,
	locked : true,
});



new ResearchItem({
	name:"Intel x86",
	description : "More powerful than any other chip in the world. Boosts your ram speed and CPU space by ten-fold.",
	key : "mult",
	value : 1,
	unlocks : "Intel Core Duo",
	time: 14400000,
	compensation : 10000,
	locked : true,
});

new ResearchItem({
	name:"Intel Core Duo",
	description : "A wonderful duo of CPU working in harmony.",
	key : "mult",
	value : 1,
	time: 14400000,
	compensation : 10000,
	locked : true,
});




function ResearchWrapper(conf){
	this.selector = conf.selector||"#project1";
	// this.card = new ResearchCard(this.selector);
	this.research = null;
	this.time = 0;
	this.started = false;
	this.completed = false;
	this.item = conf.item ? RESEARCH[conf.item] : null;
	var me = this;
	this.shown = true;
	$("#"+this.selector+"_startbtn").click(function () {
		var Test = new ModalList(getResearchList(),{
			custom_message : "No research options available. Try again in a couple.",
			title : "Choose a project:"
		});
		Test.show(function (arg) {
			me.item = RESEARCH[arg];
			me.started = true;
			GAME.startResearch(me.item)
		})
	})
	$("#"+me.selector+"_cancelbtn")
		.removeClass("btn-success")
		.addClass("btn-danger")
		.html("cancel")
		.click(function(){
			console.log("stopped")
			me.reset();
		})
}

ResearchWrapper.prototype.reset = function() {
	if (this.item){
		GAME.stopResearch(this.item);
	}
	this.item = null;
	this.started = false;
	this.completed = false;
	this.time = 0;
};

ResearchWrapper.prototype.fromJSON = function(obj) {
	this.time = obj.time;
	this.started = obj.started;
	console.log(RESEARCH[obj.item]);
	this.item = obj.item ? RESEARCH[obj.item] : null;
	this.completed = obj.completed;
};

ResearchWrapper.prototype.toJSON = function() {
	return {
		item : this.item ? this.item.name : null,
		time : this.time,
		completed : this.completed,
		started : this.started
	}
};

ResearchWrapper.prototype.draw = function (delta) {
	if (this.item){
		if (this.item.unlocks){
			var s = "";
			if (typeof this.item.unlocks == "string"){
				s = this.item.unlocks;
			}
			else {
				s = this.item.unlocks.join(",");
			}
			$("#"+this.selector+"_badge").html(s)
		}
		// For online piracy or commerce

		if (this.item.locked) {
			this.reset()
		}
	}
	else {
		$("#"+this.selector+"_badge").html("None")
	}


	if (GAME.versions["macos9"] <= 0 && this.shown == true){
		$("#research").hide();
	}
	else {
		$("#research").slideDown();
		this.shown = true;
	}
	if (this.started && this.item){
		this.time += delta;

		$("#"+this.selector + "_choose").hide();
		$("#"+this.selector + "_prog").show();
		$("#"+this.selector + "_name").html(this.item.name);
		$("#"+this.selector + "_time").html("Takes about " + moment.duration(this.item.getMaxTime()).humanize());
		$("#"+this.selector + "_remaining").html("Ready "+moment().to(Date.now() + (this.item.getMaxTime()-this.time)));
		$("#"+this.selector + "_progressbar")[0].style.width = ((this.time / this.item.getMaxTime()) * 100)+"%"
		$("#"+this.selector + "_desc").html(this.item.description || "");
		var me = this;
		if (this.time > this.item.getMaxTime()) {
			this.completed = true;
			$("#"+this.selector+"_cancelbtn")
				.removeClass("btn-danger")
				.addClass("btn-success")
				.html("collect")
				.unbind( "click" )
				.click(function(){
					if (me.item){
						me.item.complete();
						if (me.item.complete_fn) {
							me.item.complete_fn();
						}
						GAME.researched.push(me.item);
						GAME.money += me.item.compensation;
						me.reset();
						$("#"+me.selector+"_cancelbtn")
							.removeClass("btn-success")
							.addClass("btn-danger")
							.html("cancel")
							.unbind( "click" )
							.click(function(){
								console.log("canceled")
								me.reset();
							})
					}
				})
		}
		if (this.completed){

		}
	}
	else{
		$("#"+this.selector + "_choose").show();
		$("#"+this.selector + "_prog").hide();
	}
}





/*

Research:

	Research Wrapper

Holds the countable research

	Research Card

Shows the progress and the research item name.

	Research Items

The countable research item that affects gameplay

	Research chooser

Opens up a chooser for the research



1. Choose a research item
2. Start the research
3. Wait a bit
4. Item becomes available
4. Get the research


Research Cards:

Dashed border until it has research going or chosen

Click the choose project button to choose the project

Choosing a project will hide the choose project view, and open up the progress view.

*/



