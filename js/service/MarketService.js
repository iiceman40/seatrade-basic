var MarketService = function(self){

	self.currentPriceInThisCity = function(type){
		var label = type.label;
		var priceObjectForThisType = ko.utils.arrayFilter(self.me().activeCity().marketPrices(), function (priceObject) {
			return priceObject.label == label;
		});
		return round(priceObjectForThisType[0].price());
	};

	self.tradeValueSome = function(warehouse){
		return round(self.me().activeCity().marketAmount() * self.currentPriceInThisCity(warehouse.type()));
	};

	self.tradeValueAll = function(warehouse){
		return round(warehouse.content() * self.currentPriceInThisCity(warehouse.type()));
	};

	self.sellFromWarehouse = function(warehouse, amount){
		var price = self.currentPriceInThisCity(warehouse.type());
		if(warehouse.content() - amount >= 0) {
			warehouse.content(warehouse.content() - amount);
			self.me().money(round(self.me().money() + amount * price));
		} else {
			alert('You don\' t have that much!');
		}
	};

	self.sellSomeFromWarehouse = function(warehouse){
		var amount = self.me().activeCity().marketAmount();
		self.sellFromWarehouse(warehouse, amount);
	};

	self.sellAllFromWarehouse = function(warehouse){
		var amount = warehouse.content();
		self.sellFromWarehouse(warehouse, amount);
	};

	self.buyTroops = function(type){
		var oldAmount = self.me().activeCity().camp()[type.label]().amount();
		var amountToBuy = self.me().activeCity().marketAmountTroops();
		if(self.me().buyBulk(type, amountToBuy)) {
			self.me().activeCity().camp()[type.label]().amount(parseInt(oldAmount) + parseInt(amountToBuy));
		}
	}
};