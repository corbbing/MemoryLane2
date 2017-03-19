/*

The Game Class

Holds the information such as what's been downloaded
upgraded, as well as money and 

*/

function Game () {
	this.upgrades = [
		{name:"MacOS8",count:0,amt:100},
		{name:"netscape",count:0,amt:0},
		{name:"AppleWorks",count:0,amt:0},
		{name:"Lotus",count:0,amt:0},
		{name:"eWorld",count:0,amt:0},
		{name:"MacOSX",count:0,amt:0},
		{name:"macos9",count:0,amt:100},
		{name:"MacOS Mountains n shit",count:0,amt:100}
	];
	this.tutorial = false;
	this.tutorialID = 0;
	this.updates = [];
	this.versions = {};
	this.downloading = [];
	this.computer = Computer.PowerBook100;
	this.money = 1030;
	this.data = JSON.stringify(localStorage.memorylane2001) || "{}";
	this.preference = "mac";
	this.bps = 28800;
	this.bpc = 5330;
	this.lastTime = Date.now();
	this.total = 0;
	this.generated = 0;
	this.researchwrappers = {
		p1 : null,
		p2 : null,
		p3 : null
	}
	this.researched = [];
	this.researching = [];
	this.transactions = [{type:"research",name:"PowerPC"},{type:"research",name:"Webkit Engine"}];
	this.stats = {
		mult : 1,
		compression : 1,
		power : 1,
		storage : 1
	}
}

function parseTransaction(obj){
	if (obj.type == "research"){
		var tmp = RESEARCH[obj.name];
		return tmp.compensation;
	}
	if (obj.type == "computer"){
		var tmp = COMPUTERS[obj.name];
		return -tmp.price;
	}
	if (obj.type == "upgrade"){
		var tmp = RESEARCH[obj.name];
		return -tmp.price;
	}
}

Game.prototype.createTransaction = function(type,name) {
	this.transactions.push({name:name,type:type})
};

Game.prototype.getMoney = function() {
	var money = 1030;
	var tob = {};
	for (var i = 0; i < this.transactions.length; i++) {
		if (!(this.transactions[i].name in tob)){
			money += parseTransaction(this.transactions[i]);
		}
		else {
			console.log("dupe.")
		}
	};
	this.money = money;
};



Game.prototype.keyToJSON = function(obj, key){
	var tmp = [];
	for (var i = 0; i < this[key].length; i++) {
		tmp.push(this[key][i].toJSON());
	};
	return tmp;
}

Game.prototype.setComputer = function () {
	
}

RESEARCHtoJSON = function() {
	var tmp = {};
	for (name in RESEARCH){
		tmp[name] = RESEARCH[name].toJSON();
	}
	return tmp;
};


RESEARCHfromJSON = function(obj) {
	for (name in obj){
		RESEARCH[name].fromJSON(obj[name]);
	}
};

Game.prototype.researchedToJSON = function() {
	var tmp = [];
	for (var i = 0; i < this.researched.length; i++) {
		tmp.push(this.researched[i].toJSON());
	};
	return tmp;
};



Game.prototype.researchedFromJSON = function(a) {
	for (var i = 0; i < a.length; i++) {
		console.log(a[i].name)
		console.log(RESEARCH[a[i].name])
		RESEARCH[a[i].name].fromJSON(a[i]);
		this.researched.push(RESEARCH[a[i].name]);
		console.log(this.researched);
	};
};

Game.prototype.researchingToJSON = function() {
	var tmp = [];
	for (var i = 0; i < this.researching.length; i++) {
		tmp.push(this.researching[i].toJSON());
	};
	return tmp;
};

Game.prototype.researchingFromJSON = function(a) {
	var tmp = [];
	for (var i = 0; i < a.length; i++) {
		RESEARCH[a[i].name].fromJSON(a[i]);
		this.researching.push(RESEARCH[a[i].name]);
	};
	return tmp;
};

Game.prototype.downloadingToJSON = function() {
	var tmp = [];
	for (var i = 0; i < this.downloading.length; i++) {
		tmp.push(this.downloading[i].toJSON());
	};
	return tmp;
};


Game.prototype.downloadingFromJSON = function(obj) {
	var tmp = [];
	for (var i = 0; i < this.downloading.length; i++) {
		UPGRADES[obj[i].name].fromJSON(obj[i]);
		tmp.push(UPGRADES[obj.name]);
	};
	this.downloading = tmp;
};

Game.prototype.upgradesToJSON = function() {
	var tmp = [];
	for (var i = 0; i < this.upgrades.length; i++) {
		tmp.push(this.upgrades[i].toJSON());
	};
	return tmp;
};


Game.prototype.upgradesFromJSON = function(obj) {
	var tmp = [];
	for (var i = 0; i < this.upgrades.length; i++) {
		UPGRADES[obj[i].name].fromJSON(obj[i]);
		tmp.push(UPGRADES[obj[i].name]);
	};
	console.log(obj)
	this.upgrades = tmp;
};

Game.prototype.save = function() {
	var obj = {
		RESEARCH : RESEARCHtoJSON(),
		researched : this.researchedToJSON(),
		researching : this.researchingToJSON(),
		researchwrappers : {
			p1 : this.researchwrappers.p1.toJSON(),
			p2 : this.researchwrappers.p2.toJSON(),
			p3 : this.researchwrappers.p3.toJSON()
		},
		downloading : this.downloadingToJSON(),
		upgrades : this.upgradesToJSON(),
		computer : this.computer.name,
	}
	return obj;
};

Game.prototype.load = function(obj) {
	RESEARCHfromJSON(obj.RESEARCH);
	this.researchedFromJSON(obj.researched);
	this.researchingFromJSON(obj.researching);
	console.log(obj.researchwrappers);
	this.researchwrappers.p1.fromJSON(obj.researchwrappers.p1);
	this.researchwrappers.p2.fromJSON(obj.researchwrappers.p2);
	this.researchwrappers.p3.fromJSON(obj.researchwrappers.p3);
	this.upgradesFromJSON(obj.upgrades);
	this.downloadingFromJSON(obj.downloading);
	this.computer = COMPUTERS[obj.computer];
};

Game.prototype.getTotal = function() {
	var total = 0;
	for (var i = 0; i < this.upgrades.length; i++) {
		total += this.upgrades[i].count > 0 ? this.upgrades[i].getSize(-1) : 0;
	};
	return total;
};

Game.prototype.stopResearch = function(itm) {
	if (this.researching.indexOf(itm) >= 0){
		this.researching.splice(this.researching.indexOf(itm),1);
	}
	else {
		console.error("There is no item");
	}
};

Game.prototype.startResearch = function(itm) {
	this.researching.push(itm);
};

Game.prototype.getStats = function() {
	this.stats = {
		mult : 1,
		compression : 1,
		power : 1,
		storage : 1
	}
	for (var i = 0; i < this.researched.length; i++) {
		this.stats[this.researched[i].key] += this.researched[i].value;
	};
};

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
	this.getStats()
	var fromUpg = 0;
	for (var i = 0; i < this.upgrades.length; i++) {
		fromUpg += this.upgrades[i].bonus * this.upgrades[i].count;
	};
	var fromUpd = 0;
	for (var i = 0; i < this.updates.length; i++) {
		fromUpd += this.updates[i].bonus * this.updates[i].count;
	};
	return Math.min(this.bps + fromUpg + fromUpd,this.computer?this.computer.getSpeed():0) * this.stats.mult;
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


	this.getMoney();

	var SPEED = 100; //Speeds up the gameplay by this number



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
	var delta = (now - this.lastTime) * SPEED;
	for (name in this.researchwrappers){
		this.researchwrappers[name].draw(delta);
	}
	for (var i = 0; i < this.upgrades.length; i++) {
		// console.log("sad")
		this.upgrades[i].draw(delta);
	};
	for (var i = 0; i < this.updates.length; i++) {
		// console.log("sad")
		this.updates[i].draw(delta);
	};
	this.lastTime = now;
	$("#total").html(filesize(this.getTotal()) + "/" + filesize(this.getStorage()));
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
	for (name in this.researchwrappers){
		this.researchwrappers[name] = new ResearchWrapper({selector:name,item:null});
	}
};

Game.prototype.getStorage = function() {
	this.getStats();
	return Math.pow(this.computer.space, this.stats.storage);
};

Game.prototype.getCompressionRatio = function () {
	var ratio = 0;
	var fl = {complete:false}
	var base64 = this.research["base64"] || fl;
	var gzip = this.research["gzip"] || fl;
	return ratio + base64.complete + gzip.complete;
}

// var tmp = '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';

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
