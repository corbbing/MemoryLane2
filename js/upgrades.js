
function Upgrade(name,conf){
	this.title = name;
	this.name = "";
	this.count = 0;
	this.sellable = true;
	this.key = conf.key || "mult";
	this.value = conf.value||0;
	this.size = conf.size || 19710;
	this.current = conf.current || 4941;
	this.src = "img/laser.jpg";
	this.bps = 10;
	this.bpc = 2;
	this.downloading = false;
	this.unique = conf.unique||false;
	this.version = 0;
	this.maxVersion = conf.maxVersion || 10;
	this.bonus = conf.bonus||3193;
	this.requires = conf.requires || {};
	this.type = conf.type || "upgrade";
	this.card = new Card(this,$("#upgrades")[0]);

}

Upgrade.prototype.checkRequirements = function (reqs) {
	if (JSON.stringify(reqs) == "{}"){
		return 1;
	}
	var a = [];
	var total = 0;
	for (key in reqs){
		if (key in GAME.versions){
			if (GAME.versions[key] >= reqs[key]["min"]){ //Minimum is required.
				if (reqs[key]["max"]){
					if (GAME.versions[key] < reqs[key]["max"]){
						a.push(1);
						total++;
					}
				}
				else {
					a.push(1);
					total++;
				}
			}
		}
	}
	return (a.length == total && total != 0);
}

Upgrade.prototype.unfade = function () {
	
}

Upgrade.prototype.download = function() {
	if (this.checkRequirements(this.requires)){
		this.current = 0;
		this.downloading = true;
		return true;
	}
	return false;
};

Upgrade.prototype.getSize = function() {
	// return Math.pow(this.size,1 + (this.version / 12)) * GAME.getCompressionRatio();
	return Math.log(this.size) + Math.pow(this.size,1 + (this.version / 12));
};

Upgrade.prototype.getPercent = function() {
	return this.current / this.getSize();
};

Upgrade.prototype.draw = function(delta_t) {
	if (this.checkRequirements(this.requires) == 1){
		$(this.card.card.element).removeClass("faded")
		$(this.card.title.element).html(this.title + " ver." + this.version);
	}
	else {
		$(this.card.title.element).html("????")
	}
	if (this.version >= this.maxVersion){
		this.card.upg_button.disable();
	}
	if (this.getPercent() < 1 && this.downloading){
		var fromBPS = (GAME.getBPS() / GAME.downloading.length);
		var fromGen = (GAME.generated / GAME.downloading.length);
		var dled = (fromBPS * (delta_t/1000)) + fromGen;
		this.current += dled;
		GAME.total += dled;
		this.card.setProgress(this.current / this.getSize(), this.current, this.getSize());
	}
	else if (this.getPercent() >= 1){
		this.card.endDownload();
		this.count++;
		this.card.setCount();
		this.current = 0;
		this.version++;
		this.downloading = false;
		this.card.setProgress(0, this.current, this.getSize());
	}
};

Upgrade.netscape = new Upgrade("netscape",{})
Upgrade.AppleWorks = new Upgrade("AppleWorks",{
	size: 405730,
	requires : {
		netscape : {
			min : 1
		}
	},
	bonus : 14914,
})
Upgrade.macos9 = new Upgrade("Macos9",{
	size: 3453000,
	type : "update",
	requires : {
		netscape : {
			min : 5
		}
	},
	bonus : 140914,
})
Upgrade.Lotus = new Upgrade("Lotus",{
	size: 619410421,
	requires : {
		AppleWorks : {
			min : 3
		}
	},
	bonus : 149014,
})
Upgrade.eWorld = new Upgrade("eWorld",{
	size: 5739104133,
	requires : {
		Macos9 : {
			min : 10
		}
	},
	bonus : 4230014,
})
Upgrade.MacOSX = new Upgrade("MacOSX",{
	size: 43781941304,
	requires : {
		Macos9 : {
			min : 13
		}
	},
	bonus : 9790014,
})