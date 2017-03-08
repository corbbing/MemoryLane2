// Modal

function ModalMessage(subj,msg,msg_target,title_target){
	this.subject = subj;
	this.message = msg;
	this.msg_target = msg_target;
	this.title_target = title_target;
}

ModalMessage.prototype.show = function(confirm_fn) {
	$("#modal_buttons").show();
	if (!$('#myModal').hasClass("show")){
		$('#myModal').modal('show');
	}
	else {
		$('#myModal').modal('hide');
		$('#myModal').modal('show');
		console.log("asd")
	}
	$(this.msg_target).html(this.message);
	$(this.title_target).html(this.subject);
	$("#modal_confirm").click(confirm_fn||function(){})
};

function ModalList(options,conf){
	ModalMessage.call(this,conf?conf.title||"Choose":"Choose","","#modal_message","#modal_title");
	this.options = options||[];
	this.container = new lm.Div($("#modal_message")[0],"","list-group");
	this.choice = null;
	this.custom_message = "Nothing to choose from";
	if (conf){
		// a quick, sad, pathetic hack...  :(
		for (name in conf){
			this[name] = conf[name];
		}
	}
	var me = this;
	$("#modal_buttons").hide();
	for (var i = 0; i < this.options.length; i++) {
		var btn = new lm.Button(this.container,this.options[i],function () {
			var txt = options[i] + "";
			me.choice = txt;
			alert(txt);
		});
		btn.setClassName("list-group-item list-group-item-action")
	};
}

ModalList.prototype.show = function(confirm_fn) {
	$("#modal_message").html(this.options.length>0?"":this.custom_message||"Nothing to show");
	this.container = new lm.Div($("#modal_message")[0],"","list-group");
	this.choice = null;
	var me = this;
	for (var i = 0; i < this.options.length; i++) {
		var txt = this.options[i] + "";
		var btn = new lm.Button(this.container,this.options[i],function () {
			me.choice = this.innerHTML;
			confirm_fn(me.choice);
			$('#myModal').modal('hide');
			
		});
		btn.setClassName("list-group-item list-group-item-action")
	};
	$('#myModal').modal('show');

	$(this.title_target).html(this.subject);
	$("#modal_confirm").click(function(){confirm_fn(me.choice)})
};

var msg = "<ul><li>Intel 461</li></ul>";

// var Test = new ModalList(["Intel 483","Internet"]);
// Test.show(function (arg) {
// 	$("#project1").html(arg);
// })