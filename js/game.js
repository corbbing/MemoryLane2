function Game () {
	this.upgrades = [{name:"netscape",count:1,amt:0}];
	this.updates = [{name:"macos9",count:1,amt:100}];
	this.versions = {};
	this.downloading = [];
	this.computer = null;
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
	this.bps = 10000;
	this.bpc = 1330;
	this.lastTime = Date.now();
	this.total = 0;
	this.generated = 0;
}

Game.prototype.getBPS = function () {
	var fromUpg = 0;
	for (var i = 0; i < this.upgrades.length; i++) {
		fromUpg += this.upgrades[i].bonus * this.upgrades[i].count;
	};
	var fromUpd = 0;
	for (var i = 0; i < this.updates.length; i++) {
		fromUpd += this.updates[i].bonus * this.updates[i].count;
	};
	return this.bps + fromUpg + fromUpd;
}

Game.prototype.draw = function() {
	/*

Draw the game

1. Set delta t
2. draw the upgrades


	*/
	this.versions = {};
	
	this.downloading = [];

	for (var i = 0; i < this.upgrades.length; i++) {
		this.versions[this.upgrades[i].title] = this.upgrades[i].version;
		if (this.upgrades[i].downloading == true){
			this.downloading.push(this.upgrades[i]);
		}
	};
	for (var i = 0; i < this.updates.length; i++) {
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
	$("#bpc").html(filesize(this.bpc) + "/click")


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


// init Game

var GAME = new Game();

