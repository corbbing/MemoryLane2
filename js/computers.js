/*

li.list-inline-item
	div.card
		div.p-3
			h4 = Name
			ul
				li SPEED
				li STORAGE
				li PRICE
			div.text-center
				button.btn.btn-primary.btn-lg
					(data-toggle="modal" data-target="#myModal")

*/



function Computer(conf){
	this.name = conf.name;
	this.speed = conf.speed;
	this.space = 103910;
	this.buy_price = 1999.99;
	this.sell_price = 200;
	this.bought = true;
	this.mods = [];
	this.card = new ComputerCard(this);
}

Computer.prototype.buysell = function () {
	var me = this;
	if (this.bought){
		var msg = new ModalMessage("Are you sure?","Are you sure you want to sell this computer?","#modal_message","#modal_title")
		msg.show(function(){
			me.bought = false;
			$(me.card.price.element).html("Buy price: $" + me.buy_price);
			$(me.card.btn.element).addClass("btn-success");
			$(me.card.btn.element).removeClass("btn-primary");
			$(me.card.btn.element).html("buy");
			GAME.money += me.sell_price
		})
	}
	else {
		var msg = new ModalMessage("Are you sure?","Are you sure you want to buy this computer?","#modal_message","#modal_title")
		msg.show(function(){
			if (GAME.buy(me.buy_price) == true){
				me.bought = true;
				$(me.card.price.element).html("Sell price: $" + me.sell_price);
				$(me.card.btn.element).removeClass("btn-success");
				$(me.card.btn.element).addClass("btn-primary");
				$(me.card.btn.element).html("sell");
			}
		})
	}
}

Computer.prototype.getSpeed = function() {
	var total = 0;
	for (var i = 0; i < this.mods.length; i++) {
		total += this.mods[i].speed;
	};
	return this.speed + total;
};

Computer.PowerBook100 = new Computer({
	name : "PowerBook100",
	speed : 1525244
})


Computer.mod = function (conf) {
	this.speed = conf.speed || 0;
	this.storage = conf.storage || 0;
}
