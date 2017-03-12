var Errors = {
	"UtilStorage0" : "No key to save to in .parse()",
	"UtilStorage1" : "data is empty.",
}



var Util = {};

Util.checkRequirements = function (reqs) {
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


Util.sizeForVersion= function  (v,sz) {
	
}

Util.error = function (name,error) {
	console.error(Errors[name+error])
}

Util.storage = {}

Util.storage.parse = function(){
	if (localStorage["memorylane2"]){
		var obj
		try {
			obj = JSON.parse(localStorage["memorylane2"]);
		}
		catch (ex) {
			Util.error("UtilStorage1");

			return {};
		}
	}
	else {
		Util.error("UtilStorage0");
		return {};
	}
}

Util.storage.save = function(data){
	// JSON.parse(localStorage["memorylane2"]);
	localStorage["memorylane2"] = JSON.stringify(data);
}

Util.storage.getKey = function (key) {
	var obj = Util.storage.parse();
	if (typeof obj == 0){
		Util.error("UtilStorage"+obj);
	}
	else {	
		if (obj[key]){
			return [key];
		}
	}
	return null;
}

Util.storage.setKey = function (key,data) {
	var obj = Util.storage.parse();
	obj[key] = data;
	Util.storage.save(obj);
}













