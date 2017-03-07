function Game () {
	this.upgrades = [
		{name:"netscape",count:1,amt:0},
		{name:"AppleWorks",count:0,amt:0},
		{name:"Lotus",count:0,amt:0},
		{name:"eWorld",count:0,amt:0},
		{name:"MacOSX",count:0,amt:0}
	];
	this.tutorial = true;
	this.tutorialID = 0;
	this.updates = [{name:"macos9",count:0,amt:100}];
	this.versions = {};
	this.downloading = [];
	this.computer = Computer.PowerBook100;
	this.research = {
		"intel" : {
			amt : 1024,
			complete : false
		},
		"base64" : {
			amt : 1024,
			complete : true,
		},
	};
	this.money = 1030;
	this.data = JSON.stringify(localStorage.memorylane2001) || "{}";
	this.preference = "mac";
	this.bps = 1000;
	this.bpc = 1330;
	this.lastTime = Date.now();
	this.total = 0;
	this.generated = 0;
}

Game.prototype.buy = function(amt) {
	var me = this;
	if (this.money >= amt){
		this.money -= amt;
		return true;
	}
	else {
		return false;
	}
};

Game.prototype.getBPS = function () {
	var fromUpg = 0;
	for (var i = 0; i < this.upgrades.length; i++) {
		fromUpg += this.upgrades[i].bonus * this.upgrades[i].count;
	};
	var fromUpd = 0;
	for (var i = 0; i < this.updates.length; i++) {
		fromUpd += this.updates[i].bonus * this.updates[i].count;
	};
	return Math.min(this.bps + fromUpg + fromUpd,this.computer.getSpeed()) * 1;
}

Game.prototype.getBPC = function () {
	var fromUpg = 0;
	for (var i = 0; i < this.upgrades.length; i++) {
		fromUpg += (this.upgrades[i].bonus * this.upgrades[i].count) * 0.1;
	};
	var fromUpd = 0;
	for (var i = 0; i < this.updates.length; i++) {
		fromUpd += (this.updates[i].bonus * this.updates[i].count) * 0.1;
	};
	return (this.bpc + fromUpg + fromUpd) * 1;
}

Game.prototype.draw = function() {
	/*

Draw the game

1. Set delta t
2. draw the upgrades


	*/
	this.versions = {};
	this.versions[this.computer.name] = 1;
	
	this.downloading = [];

	for (var i = 0; i < this.upgrades.length; i++) {
		this.versions[this.upgrades[i].title] = this.upgrades[i].version;
		if (this.upgrades[i].downloading == true){
			this.downloading.push(this.upgrades[i]);
		}
	};
	for (var i = 0; i < this.updates.length; i++) {
		this.versions[this.updates[i].title] = this.updates[i].version;
		if (this.updates[i].downloading == true){
			this.downloading.push(this.updates[i]);
		}
	};


	var now = Date.now();
	var delta = now - this.lastTime;
	for (var i = 0; i < this.upgrades.length; i++) {
		// console.log("sad")
		this.upgrades[i].draw(delta);
	};
	for (var i = 0; i < this.updates.length; i++) {
		// console.log("sad")
		this.updates[i].draw(delta);
	};
	this.lastTime = now;
	$("#total").html(filesize(this.total))
	$("#speed").html(filesize(this.getBPS()) + "/sec")
	$("#bpc").html(filesize(this.getBPC()) + "/click")
	$("#money").html("$" + this.money);

	this.generated = 0;
};

Game.prototype.init = function() {
	for (var i = 0; i < this.upgrades.length; i++) {
		var upg = Upgrade[this.upgrades[i].name];
		for (key in this.upgrades[i]){
			upg[key] = this.upgrades[i][key];
		}2
		this.upgrades[i] = upg;
	};
	for (var i = 0; i < this.updates.length; i++) {
		var upg = Upgrade[this.updates[i].name];
		for (key in this.updates[i]){
			upg[key] = this.updates[i][key];
		}2
		this.updates[i] = upg;
	};
};

Game.prototype.start = function() {
	
};

Game.prototype.getCompressionRatio = function () {
	var ratio = 0;
	var fl = {complete:false}
	var base64 = this.research["base64"] || fl;
	var gzip = this.research["gzip"] || fl;
	return ratio + base64.complete + gzip.complete;
}

var tmp = '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

var tutkeys = [
	{
		selector : "#clickarea",
		content : "Click here to add some extra bytes.",
		placement : "bottom",
	},
	{
		selector : "#upgrades",
		content : "Upgrade your software to go faster.",
		placement : "bottom",
	},
	{
		selector : "#computers",
		content : "Buy computers when you have the money.",
		placement : "bottom",
	},
]

Game.prototype.nextTut = function() {
	if (this.tutorialID >= tutkeys.length || !GAME.tutorial){
		return 1;
	}
	var me = this;
	$(tutkeys[this.tutorialID].selector).popover(tutkeys[this.tutorialID]).popover("show").focus().click(function () {
		$(this).data("bs.popover").hide();
		me.nextTut();
	});
	if (this.tutorialID < tutkeys.length){
		this.tutorialID++;
	}
};


// init Game

var GAME = new Game();
GAME.nextTut()
