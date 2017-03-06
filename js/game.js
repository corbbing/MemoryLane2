function Game () {
	this.upgrades = [{name:"netscape",count:1,amt:0}];
	this.updates = [{name:"macos9",count:1,amt:100}];
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
	this.bpc = 100000;
	this.lastTime = Date.now();
	this.interval = null;
}

Game.prototype.getBPS = function () {
	
}

Game.prototype.draw = function() {
	var now = Date.now();
	var delta = now - this.lastTime;
	for (var i = 0; i < this.upgrades.length; i++) {
		// console.log("sad")
		this.upgrades[i].draw(delta);
	};
	this.lastTime = now;
};

Game.prototype.init = function() {
	for (var i = 0; i < this.upgrades.length; i++) {
		var upg = Upgrade[this.upgrades[i].name];
		for (key in this.upgrades[i]){
			upg[key] = this.upgrades[i][key];
		}
		upg.draw(10);
		this.upgrades[i] = upg;
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

