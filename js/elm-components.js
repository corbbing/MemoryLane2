lm.PopupOption = function (target,str,value) {
	lm.call(this,str,"option","",target);
	this.setAttr("value",value||str)
}
lm.PopupOption.prototype = Object.create(lm.prototype);

lm.PopupMenu = function(target,list){
	lm.call(this,"","select","",target);
	for (var i = 0; i < list.length; i++) {
		new lm.PopupOption(this,list[i]);
	};
}
lm.PopupMenu.prototype = Object.create(lm.prototype);

lm.PopupMenu.prototype.getValue = function () {
	return this.element.value;
}

/*

input>string or array

*/

lm.PopupMenu.prototype.add = function (items) {
	if (arguments.length < 2){
		if (typeof items == "object"){
			for (var i = 0; i < items.length; i++) {
				new lm.PopupOption(this,items[i]);
			};
		}
		else if (typeof items != "string"){
			new lm.PopupOption(this,items);
		}
		else{
			new lm.PopupOption(this,items);
		}
	}
	else {
		for (var i = 0; i < arguments.length; i++) {
			new lm.PopupOption(this,arguments[i]);
		};
	}
}


lm.Button = function (target,name, fn, _cls) {
	lm.call(this,name, "button", _cls||"", target);
	this.element.onclick = fn || null;
}
lm.Button.prototype = Object.create(lm.prototype);

lm.Button.prototype.disable = function() {
	this.element.disabled = true;
};

lm.RecordPopupMenu = function(target,records,key){
	this.key = key;
	lm.call(this,"","select","",target);
	this.config = {
		records : records
	};
	if (typeof records){
		
	}
	for (var i = 0; i < records.length; i++) {
		new lm.PopupOption(this,records[i][key],JSON.stringify(records[i]))
	};
}
lm.RecordPopupMenu.prototype = Object.create(lm.prototype);

lm.RecordPopupMenu.prototype.add = function(rec){
	new lm.PopupOption(this,rec[this.key],JSON.stringify(rec));
}

lm.RecordPopupMenu.prototype.getValue = function () {
	return JSON.parse(this.element.value);
}



lm.Div = function(target, name, _cls){
	lm.call(this,name,"div",_cls||"",target);
}

lm.Div.prototype = Object.create(lm.prototype);

lm.Br = function(target){
	lm.call(this,"","br","",target);
}

lm.Br.prototype = Object.create(lm.prototype);

lm.Anchor = function(target, name, link, _cls){
	lm.call(this,name,"a",_cls||"",target);
	this.setAttr("href",link);
}

lm.Anchor.prototype = Object.create(lm.prototype);

lm.Para = function(target){
	lm.call(this,"","p","",target);
}
lm.Para.prototype = Object.create(lm.prototype);


lm.Header = function(target,text,size){
	lm.call(this,text,"h"+size,"",target);

}

lm.ItemList = function(target,items){
	lm.call(this,"","ul","",target);
	for (var i = 0; i < items.length; i++) {
		new lm(items[i],"li","",this);
	};
}
lm.ItemList.prototype = Object.create(lm.prototype);

lm.AnchorList = function(target,anchors){
	lm.call(this,"","ul","",target);
	for (var i = 0; i < anchors.length; i++) {
		var li = new lm("","li","",this);
		new lm.Anchor(li,anchors[i].name,anchors[i].link)
	};
}
lm.AnchorList.prototype = Object.create(lm.prototype);


lm.ElmBsDropdown = function(target, name, options){
	lm.call(this,"","li","dropdown",target);
	this.link = new lm.Anchor(this,name +  "<span class='caret'>","#");
	this.link.setAttr("data-toggle","dropdown")
	this.link.setAttr("role","button")
	this.link.setClassName("dropdown-toggle");
	this.list = new lm.AnchorList(this,options);
	this.list.setClassName("dropdown-menu");
}
lm.ElmBsDropdown.prototype = Object.create(lm.prototype);

lm.FormInput = function(target, type, name){
	this.label = new lm(name,"label","",target);
	lm.call(this, "","input","",target);
	this.setAttr("id","form_"+name);
	this.label.setAttr("for","form_"+name);
	this.setAttr("type",type);
	this.setAttr("name",name);
}
lm.FormInput.prototype=Object.create(lm.prototype);

lm.Form = function(target, method, action){
	lm.call(this,"","form","form",target);
}
lm.Form.prototype = Object.create(lm.prototype);

lm.Form.prototype.add = function(type, name){
	if (type != "br"){
		new lm.FormInput(this, type, name)
	}
	else {
		new lm("","br","",this);
	}
}

lm.FormInput.prototype.getValue = function(){
	return this.element.value;
}

function extendProto(obj, parent){
	obj.prototype = Object.create(parent.prototype);
}

lm.sections = {};

lm.sections.Primary = function(){
	lm.call(this,"","section","bg-primary",document.body);
}
extendProto(lm.sections.Primary,lm);

lm.sections.Primary = function(){
	lm.call(this,"","section","bg-primary",document.body);
}
extendProto(lm.sections.Primary,lm);

// lm.sections.Primary.prototype.add = function(target,s){

// }

lm.TableHeaders = function(target, data){
	lm.call(this,"","thead","",target);
	this.data = data;
	this.tr = new lm("","tr","row",this);
	for (var i = 0; i < data.length; i++) {
		new lm(data[i],"th","",this.tr);
	};
}
extendProto(lm.TableHeaders,lm)

lm.TableRows = function(target, data){
	lm.call(this,"","tr","row",target);
	this.data = data;
	for (var i = 0; i < data.length; i++) {
		new lm(data[i],"td","",this);
	};
}
extendProto(lm.TableRows,lm)

lm.Table = function(target,headers){
	lm.call(this,"","table","table table-condensed",target);
	this.headers = new lm.TableHeaders(this,headers);
	this.rows = [];
	this.tbody = new lm("","tbody","",this);
}
extendProto(lm.Table,lm)

lm.Table.prototype.add = function(data){
	this.rows.push(new lm.TableRows(this.tbody, data))
}

lm.Table.prototype.setRow = function(idx,data){
	for (var i = 0; i < data.length; i++) {
	 	console.log(this.rows[idx].children[i])
	 	this.rows[idx].children[i].setName(data[i]);
	 }; 
}
