var wireframe_mode = false;

if (wireframe_mode){
	// $("#project1").click(function () {
	// 	var Test = new ModalList(["Intel 483","Internet"]);
	// 	Test.show(function (arg) {
	// 		$("#project1>.p-3>div").html(arg);
	// })
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