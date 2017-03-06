/*

Elm.js

Elm allows you to build a dom using javascript syntax.

The goal of this was to make it so that someone with
little knowledge of javascript, who still understands 
the syntax, to be able to create a webpage with little
effort.

*/

function lm(name,tag,className,parent,empty){
	var conf = arguments[0];
	// var name = conf.name || "";
	// var tag = conf.tag || "";
	// var className = conf.className || "";
	// var parent = conf.parent || "";
	this.name = name;
	this.class = className;
	this.element = document.createElement(tag);
	this.element.innerHTML = this.name;
	if (className != ""){
		this.element.className = className;
	}
	this.children = [];
	this.dopop = false;
	if (!empty){
		if (parent instanceof lm){
			if (parent.element){
				if (parent.dopop){
					parent.element.insertBefore(this.element,parent.element.firstChild);
				}
				else {
					parent.element.appendChild(this.element);
				}				
				parent.children.push(this);
			}
		}
		else if (typeof parent == "string"){
			var prt = document.getElementById(parent);
			prt.appendChild(this.element);
		}
		else if (parent == "head"){
			document.getElementsByTagName('head')[0].appendChild(this.element)
		}
		else {
			parent.appendChild(this.element);
		}
	}
	else {
		return this;
	}
}

lm.prototype.getName = function(){
	return this.name;
}

lm.prototype.setName = function(n){
	this.name = n;
	this.element.innerHTML = n;
	for (var i = 0; i < this.children.length; i++){
		this.element.appendChild(this.children[i].element);
	}
}

lm.prototype.setAttr = function (key,value) {
	this.element.setAttribute(key, value);
}

lm.prototype.setClassName = function(n){
	this.class = n;
	this.element.className = n;
}

lm.prototype.addChild = function(c){
	this.children.push(c);
}

lm.prototype.setEvent = function(evtName, fun){
	this.element[evtName] = fun;
}

//shorthand for getElement

lm.prototype.ge=function(){
	return this.element;
}

getElement = function(string){
	return document.getElementById(string);
}

Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};


lm.prototype.create = function(name){
	var o = eval(name);
	var a = [this]
	for (var i = 0; i < arguments.length; i++) {
		if (i != 0){
			a.push(arguments[i])
		}
	};
	//console.log(oo=o);
	return o.construct(a);
}


