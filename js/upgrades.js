
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
	this.bps = 1;
	this.bpc = 2;
	this.downloading = false;
	this.card = new Card(this,$("#upgrades")[0]);
	this.unique = conf.unique||false;
	this.version = 0;
	this.bonus = conf.bonus||3193;
	this.requires = conf.requires || {}
}

Upgrade.prototype.checkRequirements = function (reqs) {
	if (JSON.stringify(reqs) == "{}"){
		return 1;
	}
	var a = [];
	var total = 0;
	for (key in reqs){
		if (key in GAME.versions){
				console.log(GAME.versions)
				console.log(reqs[key]["min"])
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

Upgrade.prototype.download = function() {
	if (this.checkRequirements(this.requires)){
		this.current = 0;
		this.downloading = true;
		return true;
	}
	return false;
};

Upgrade.prototype.getSize = function() {
	return Math.pow(this.size,1 + (this.version / 8)) * GAME.getCompressionRatio();
};

Upgrade.prototype.getPercent = function() {
	return this.current / this.getSize();
};

Upgrade.prototype.draw = function(delta_t) {
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
	}
};

Upgrade.netscape = new Upgrade("netscape",{})
Upgrade.macos9 = new Upgrade("Macos9",{
	size: 34573000,
	type : "update",
	requires : {
		netscape : {
			min : 1
		}
	},
	bonus : 14914,
})