// Modal

function ModalMessage(subj,msg,msg_target,title_target){
	this.subject = subj;
	this.message = msg;
	this.msg_target = msg_target;
	this.title_target = title_target;
}

ModalMessage.prototype.show = function(confirm_fn) {
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

