// function Research () {
// 	this.name = "";
// 	this.pay = 0; //compensation
// 	this.time = 0;
// 	this.maxTime = 0;
// 	this.bundle = {
// 		current : 0,
// 		max : 139018301
// 	}
// }

// Research.prototype.update = function(delta) {
	
// };

// Research.prototype.checkRequirements = function (reqs) {
// 	if (JSON.stringify(reqs) == "{}"){
// 		return 1;
// 	}
// 	var a = [];
// 	var total = 0;
// 	for (key in reqs){
// 		if (key in GAME.versions){
// 			a.push(1);
// 			if (GAME.versions[key] >= reqs[key]["min"]){ //Minimum is required.
// 				if (reqs[key]["max"]){
// 					if (GAME.versions[key] < reqs[key]["max"]){
// 						total++;
// 					}
// 				}
// 				else {
// 					total++;
// 				}
// 			}
// 		}
// 	}
// 	return (a.length == total && total != 0);
// }


// Research.prototype.start = function() {

// };



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
	this.time = conf.time||3000;
	this.compensation = conf.compensation || 100;
	RESEARCH_LIST.push(this);
	RESEARCH[this.name]=this;
}

new ResearchItem({
	name:"Intel 486",
	value : 2,
});

new ResearchItem({
	name:"i80 LaunchForce HardDrive",
	key : "storage",
	description : "The i80 LaunchForce HardDrive lets you store an incredible amount of things in a tiny little box. <br> +$1000.00",
	value : 2,
	time: 4700000,
	compensation : 1000
});

new ResearchItem({
	name:"GZip",
	key:"storage",
	description : "\"I need you to take on this project. I'll pay you in full. I need it now. Now, I said, now!\"",
	value : 0.75,
});

new ResearchItem({
	name:"Duh Fing Compaktuh",
	description : "Welcome to Duh Fing Compaktuh. All be setting up all of your items, so you, can start playing. You'll have fun. <br> ~~Message complete~~",
	key : "mult",
	value : 1,
	time: 47000,
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
			custom_message : "No research options available. Try again in a couple."
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
		$("#"+this.selector + "_remaining").html("Ready "+moment().to(Date.now() + this.item.time));
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



