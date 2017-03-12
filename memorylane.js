GAME.init();
// GAME.start();

function save(){
	localStorage["memorylane2"] = JSON.stringify(GAME.save());
}



setInterval(function () {
	GAME.draw();
},100/1)

function load(){
	GAME.load(JSON.parse(localStorage["memorylane2"]));
}

load();

setInterval(function () {
	save()
},10000)

if (!GAME.preference){
	$("section").hide();


	$("header").click(function () {
		$("header").hide();
		$("section").show();
	})
}
else {
	$("header").hide();
}

$("#clickarea").click(function () {
	GAME.generated += GAME.getBPC();
})