/*

Structure

li.ccontainer
	div.card
		div.view.overlay.hm-white-slight
			img.rounded IMGSRC
		div.card-block
			div.badge-tr-container
				h4
					span.badge.badge-default.badge-tr AMT
			h4.card-title.text-center  TITLE
			p INFO
			p UPGRADEEFFECT
				span BYTES/SEC
				span BYTES/CLICK
			div.progress
				div.progress-bar.bg-info WIDTHPRG
			div.text-center
				a.btn.btn-primary UPGRADE
				a.btn.btn-primary SELL

*/

function Card(obj,parent){
	this.container = new lm("","li","list-inline-item ccontainer",parent);
	this.obj = obj; // An instance of "upgrade" or "research"
	this.card = new lm.Div(this.container,"","card");
	this.img_view = new lm.Div(this.card,"","view overlay hm-white-slight");
	this.img = new lm("","img","rounded",this.img_view);
	this.img.element.src = obj.src;
	this.card_block = new lm.Div(this.card,"","card-block");
	this.badge_tr_container = new lm.Div(this.card_block,"","badge-tr-container");
	this.h4 = new lm("","h4","badge-tr-container",this.badge_tr_container);
	this.badge = new lm(obj.count||1,"span","badge badge-default badge-tr",this.h4);
	this.title = new lm(obj.title||"","h4","card-title text-center",this.card_block);
	this.info = new lm("","p","",this.card_block);
	this.upgradeeffect = new lm("","p","",this.card_block);
	this.downloaded = new lm("","span","",this.upgradeeffect);
	new lm.Br(this.upgradeeffect);
	this.BPS = new lm(obj.bps||"BPS","span","",this.upgradeeffect);
	new lm.Br(this.upgradeeffect);
	this.BPC = new lm(obj.bpc||"BPC","span","",this.upgradeeffect);
	this.progress_bar = new lm.Div(this.card_block,"","progress");
	this.progress = new lm.Div(this.progress_bar,"","progress-bar bg-info");
	this.buttons = new lm.Div(this.card_block,"","text-center");
	var me = this;
	var type = obj.type;
	this.upg_btn = new lm.Button(this.buttons,type=="update"? "UPDATE":"UPGRADE",function () {
		if (me.obj.download()){
			me.startDownload();
		}
	},"btn btn-primary");
	this.sel_btn = new lm.Button(this.buttons,"SELL","","btn btn-primary waves-effect waves-light");
	if (!obj.sellable){
		this.sel_btn.disable();
	}
}

// Card.prototype.setProgress = function(percent) {
// 	this.progress.element.style.width = Math.floor(percent * 100) + "%";
// };

Card.prototype.setProgress = function(percent,current,max) {
	var pce = Math.floor(percent * 100) + "%";
	this.downloaded.setName(filesize(current) + "/" + filesize(max) + " "+pce);
	this.progress.element.style.width = pce;
};

Card.prototype.setCount = function() {
	this.badge.setName(this.obj.count);
};

Card.prototype.startDownload= function () {
	this.upg_btn.disable();
}

Card.prototype.endDownload= function () {
	this.upg_btn.enable();
}


