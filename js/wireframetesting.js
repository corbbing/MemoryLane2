var wireframe_mode = true;

var wireframe_version = 1;

if (wireframe_mode && wireframe_version == 0){
	// $("#project1").click(function () {
	// 	var Test = new ModalList(["Intel 483","Internet"]);
	// 	Test.show(function (arg) {
	// 		$("#project1>.p-3>div").html(arg);
	// })


//Research testing


	$("#p1_prog").hide();
	$("#p1_startbtn").click(function () {
		var Test = new ModalList(["Intel 486","Internet"]);
		Test.show(function (arg) {
			$("#p1_name").html(arg);
			$("#p1_prog").show();
			$("#p1_choose").hide();
		})
	})
	$("#p1_cancelbtn").click(function () {
		$("#p1_prog").hide();
		$("#p1_choose").show();
	})
	$("#research_view_button").click(function () {
		var Test = new ModalList(["Intel 483","Internet"]);
		Test.show(function (arg) {
			$("#project1").html(arg);
		})
	})
}

function showShop(){
	$(".game").addClass("shadowed").slideUp().removeClass("shadowed");
	$(".shop").addClass("shadowed").slideDown().removeClass("shadowed");
}

function hideShop(){
	$(".game").addClass("shadowed").slideDown().removeClass("shadowed");
	$(".shop").addClass("shadowed").slideUp().removeClass("shadowed");
}

if (wireframe_mode && wireframe_version == 1){
	showShop();
	$(".cats>.list-group-item").click(function(){
		$(".cats>.list-group-item").removeClass("active");
		$(this).addClass("active");
		console.log($(this).attr("data-category"));
	})
	$("#shop_close").click(function (e	){
		e.preventDefault();
		hideShop();
	});
	$("#shop_open").click(function () {
		showShop();
	})
}
