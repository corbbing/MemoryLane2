GAME.init();
// GAME.start();

setInterval(function () {
	GAME.draw();
},100/3)

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
	GAME.generated += GAME.bpc;
})