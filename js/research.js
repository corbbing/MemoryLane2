function Research () {
	this.name = "";
	this.pay = 0; //compensation
	this.time = 0;
	this.maxTime = 0;
	this.bundle = {
		current : 0,
		max : 139018301
	}
}



Research.prototype.checkRequirements = function (reqs) {
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


Research.prototype.start = function() {
	// body...
};