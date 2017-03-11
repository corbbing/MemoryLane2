
function Upgrade(name,conf){
	this.title = name;
	this.name = "";
	this.count = 0;
	this.sellable = conf.sellable||true;
	this.key = conf.key || "mult";
	this.value = conf.value||0;
	this.size = conf.size || 19710;
	this.current = conf.current || 0;
	this.src = "img/laser.jpg";
	// this.bps = 10;
	this.bpc = 2103;
	this.downloading = false;
	this.unique = conf.unique||false;
	this.version = 0;
	this.maxVersion = conf.maxVersion || 16;
	this.bonus = conf.bonus||3193;
	this.requires = conf.requires || {};
	this.type = conf.type || "upgrade";
	this.card = new Card(this,$("#upgrades")[0]);
	this.value = conf.value||100;
	this.unlock_fn = conf.unlock_fn||-1;
	this.unlock_vn = conf.unlock_vn||null;
	this.forpreference = conf.pref||"mac";
	this.sold = false;
}

Upgrade.prototype.checkRequirements = function (reqs) {
	if (this.getSize() + GAME.getTotal() > GAME.getStorage()){
		return 0;
	}
	if (JSON.stringify(reqs) == "{}"){
		return 1;
	}
	var a = [];
	var total = 0;
	for (key in reqs){
		if (key in GAME.versions){
			a.push(1);
			if (GAME.versions[key] >= reqs[key]["min"]){ //Minimum is required.
				if (reqs[key]["max"]){
					if (GAME.versions[key] < reqs[key]["max"]){
						total++;
					}
				}
				else {
					total++;
				}
			}
		}
	}
	return (a.length == total && total != 0);
}

Upgrade.prototype.unfade = function () {
	
}

Upgrade.prototype.timeRemaining = function () {
	var delta_dl =  this.current-this.getSize();
	var speed = GAME.getBPS() / GAME.downloading.length;
	return moment(moment().seconds((delta_dl/speed)>>0 * 60)).toNow();
}

Upgrade.prototype.download = function() {
	if (this.checkRequirements(this.requires)){
		this.current = 0;
		this.downloading = true;
		return true;
	}
	return false;
};

Upgrade.prototype.getSize = function(arg) {
	// return Math.pow(this.size,1 + (this.version / 12)) * GAME.getCompressionRatio();
	return Math.log(this.size) + Math.pow(this.size,1 + ((this.version + (arg || 0)) / 32)) * 1;
};

Upgrade.prototype.getPercent = function() {
	return this.current / this.getSize();
};

Upgrade.prototype.sell = function() {
	this.sold = true;
	GAME.pay(this.BPC)
};

Upgrade.prototype.stop = function() {
	this.current = 0;
	this.downloading = false;

};

Upgrade.prototype.draw = function(delta_t) {
	if (this.sellable == false){
		this.card.sel_btn.disable();
	}
	if (this.checkRequirements(this.requires) == 1){
		$(this.card.card.element).removeClass("faded")
		this.card.show()
		$(this.card.title.element).html(this.title + " ver." + this.version);
	}
	else {
		$(this.card.title.element).html("????")
	}
	if (this.version >= this.maxVersion){
		this.card.upg_btn.disable();
	}
	if (this.getPercent() < 1 && this.downloading){
		$(this.card.timeleft.element).html("Ready "+this.timeRemaining());
		var fromBPS = (GAME.getBPS() / GAME.downloading.length);
		var fromGen = (GAME.generated / GAME.downloading.length);
		var dled = (fromBPS * (delta_t/1000)) + fromGen;
		this.current += dled;
		GAME.total += dled;
		this.card.setProgress(this.current / this.getSize(), this.current, this.getSize());
	}
	else if (this.getPercent() >= 1){
		$(this.card.timeleft.element).html("&nbsp;");
		this.card.endDownload();
		this.count++;
		this.card.setCount();
		this.current = 0;
		this.version++;
		if (this.version == this.unlock_vn){
			this.unlock_fn()
		}
		this.downloading = false;
		this.card.setProgress(0, this.current, this.getSize());
	}
	this.card.BPC.setName("$" + this.value);
};

/*Extra Functions*/

function makeNotification(title,msg,type){
	function doNotify(){
		notify(title,msg,type)
	}
	return doNotify;
}

Upgrade["MacOS8"] = new Upgrade("MacOS8",{
	size: 140573 ,
	bonus : 1491,
	sellable : false
});
Upgrade.netscape = new Upgrade("netscape",{
	size: 1403573 ,
	bonus : 13491,
	sellable : false,
	requires : {
		"MacOS8" : {
			min : 2
		}
	}
});
Upgrade.AppleWorks = new Upgrade("AppleWorks",{
	size: 405730 ,
	requires : {
		netscape : {
			min : 1
		}
	},
	bonus : 31014,
});
Upgrade.macos9 = new Upgrade("macos9",{
	size: 3453000 ,
	type : "update",
	sellable : false,
	requires : {
		netscape : {
			min : 5
		},
		AppleWorks : {
			min : 5
		}
	},
	unlock_fn : makeNotification("You've unlocked research!","You can now start researching new technology.","success"),
	unlock_vn : 1,
	bonus : 140914,
})
Upgrade.Lotus = new Upgrade("Lotus",{
	size: 619410421 ,
	requires : {
		AppleWorks : {
			min : 3
		}
	},
	bonus : 1666450,
})
Upgrade.eWorld = new Upgrade("eWorld",{
	size: 5739104133,
	requires : {
		Lotus : {
			min : 3
		}
	},
	bonus : 17230014,
})
Upgrade.MacOSX = new Upgrade("MacOSX",{
	size: 43781941304,
	requires : {
		macos9 : {
			min : 10
		}
	},
	bonus : 452300140,
})