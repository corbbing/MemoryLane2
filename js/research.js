var RESEARCH = {};

var RESEARCH_LIST = [];

function getResearchList(){
	var tmp = [];
	for (var i = 0; i < RESEARCH_LIST.length; i++) {
		if (GAME.researched.indexOf(RESEARCH_LIST[i]) < 0 &&
			GAME.researching.indexOf(RESEARCH_LIST[i]) < 0){
			tmp.push(RESEARCH_LIST[i].name)
		}
	};
	return tmp;
}

function ResearchItem(conf){
	this.name = conf.name || "";
	this.key = conf.key || "mult";
	this.value = conf.value||1;
	this.description = conf.description || "";
	this.time = conf.time||300000;
	this.compensation = conf.compensation || 100;
	RESEARCH_LIST.push(this);
	RESEARCH[this.name]=this;
}

new ResearchItem({
	name:"Intel 486",
	description: "Literally triples* your internet speed. *(actually increases it just a tiny bit. But hey! It makes a difference!)",
	value : 0.5,
});

new ResearchItem({
	name:"i80 LaunchForce HardDrive",
	key : "storage",
	description : "The i80 LaunchForce HardDrive lets you store an incredible amount of things in a tiny little box. <br> +$1000.00",
	value : 1,
	time: 1200000,
	compensation : 1000
});

new ResearchItem({
	name:"GZip",
	key:"storage",
	time: 120000,
	compensation: 15,
	description : "\"I need you to take on this project. I'll pay you in full. I need it now. Now, I said, now!\"",
	value : 0.1,
});

new ResearchItem({
	name:"Duh Fing Compaktuh",
	description : "Welcome to Duh Fing Compaktuh. All be setting up all of your items, so you, can start playing. You'll have fun. <br> ~~Message complete~~",
	key : "mult",
	value : 0.12,
	time: 47000,
	compensation : 100
});

new ResearchItem({
	name:"High Powered Modems",
	description : "These modems boast almost 60kbps! The fastest you'll ever find!",
	key : "mult",
	value : 1,
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


function ResearchWrapper(conf){
	this.selector = conf.selector||"#project1";
	// this.card = new ResearchCard(this.selector);
	this.research = null;
	this.time = 0;
	this.started = false;
	this.completed = false;
	this.item = conf.item ? RESEARCH[conf.item] : null;
	var me = this;
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

ResearchWrapper.prototype.draw = function (delta) {
	if (this.started && this.item){
		this.time += delta;

		$("#"+this.selector + "_choose").hide();
		$("#"+this.selector + "_prog").show();
		$("#"+this.selector + "_name").html(this.item.name);
		$("#"+this.selector + "_time").html("Takes about " + moment.duration(this.item.time).humanize());
		$("#"+this.selector + "_remaining").html("Ready "+moment().to(this.item.time-this.time));
		$("#"+this.selector + "_progressbar")[0].style.width = ((this.time / this.item.time) * 100)+"%"
		$("#"+this.selector + "_desc").html(this.item.description || "");
		var me = this;
		if (this.time > this.item.time) {
			this.completed = true;
			$("#"+this.selector+"_cancelbtn")
				.removeClass("btn-danger")
				.addClass("btn-success")
				.html("collect")
				.unbind( "click" )
				.click(function(){
					if (me.item){
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



