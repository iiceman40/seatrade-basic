var Player = function (data) {
	var self = this;

	this.name = ko.observable(data.name);
	this.isMe = ko.observable(data.isMe);

	this.money = ko.observable(data.money || 5000);

	this.activeCity = ko.observable(data.activeCity);
	this.activeArea = ko.observable(data.activeArea);

	this.castlesOwned = ko.observable(data.playerCastles);

	// methods
	this.buy = function(item){
		if(self.money() - item.price() >= 0) {
			self.money(round(self.money() - item.price()));
			return true;
		} else {
			alert('You don\'t have enough money');
			return false;
		}
	}

	this.buyBulk = function(item, amount){
		if(self.money() - item.price()*amount >= 0) {
			self.money(round(self.money() - item.price()*amount));
			return true;
		} else {
			alert('You don\'t have enough money');
			return false;
		}
	}

};