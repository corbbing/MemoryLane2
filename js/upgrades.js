
function Upgrade(name,conf){
	this.title = name;
	this.name = "";
	this.count = 0;
	this.sellable = true;
	this.key = conf.key || "mult";
	this.value = conf.value||1;
	this.size = 198710;
	this.current = conf.current || 4941;
	this.src = "img/laser.jpg";
	this.bps = 1;
	this.bpc = 2;
	this.downloading = false;
	this.card = new Card(this,$("#upgrades")[0]);
}

Upgrade.prototype.download = function() {
	this.current = 0;
	this.downloading = true;
};

Upgrade.prototype.getSize = function() {
	return this.size * GAME.getCompressionRatio();
};

Upgrade.prototype.getPercent = function() {
	return this.current / this.size;
};

Upgrade.prototype.draw = function(delta_t) {
	if (this.getPercent() < 1 && this.downloading){
		this.current += (GAME.bps / GAME.upgrades.length) * (delta_t/1000);
		this.card.setProgress(this.current / this.getSize(), this.current, this.size);
	}
	else if (this.getPercent() >= 1){
		this.count++;
		this.card.setCount();
		this.current = 0;
		this.downloading = false;
	}
};

Upgrade.netscape = new Upgrade("netscape",{})
Upgrade.macos9 = new Upgrade("Macos9",{})