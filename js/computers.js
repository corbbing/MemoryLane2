function Computer(conf){
	this.name = conf.name;
	this.speed = conf.speed;
	this.space = 10391003;
	this.mods = [];
}

Computer.prototype.getSpeed = function() {
	var total = 0;
	for (var i = 0; i < this.mods.length; i++) {
		total += this.mods[i].speed;
	};
	return this.speed + total;
};

Computer.PowerBook100 = new Computer({
	name : "PowerBook100",
	speed : 1525244
})


Computer.mod = function (conf) {
	this.speed = conf.speed || 0;
	this.storage = conf.storage || 0;
}
