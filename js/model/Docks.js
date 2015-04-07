var Docks = function () {
	var self = this;

	this.warehousePrice = 2000;

	this.storages = ko.observableArray([]);
	this.ships = ko.observableArray([]);

	this.amountToLoad = ko.observable(100);

	// methods
	this.createWarehouse = function(type, owner){
		return new Storage({
			type: type,
			owner: owner,
			label: 'warehouse ' + type.label,
			capacity: 1000,
			price: self.warehousePrice
		});
	}

	// computed
	this.selectedShips = ko.computed(function(){
		return ko.utils.arrayFilter(self.ships(), function (ship) {
			return ship.selectedForTraveling();
		});
	}, this);

	this.cargoShips = ko.computed(function(){
		return ko.utils.arrayFilter(self.ships(), function (ship) {
			return ship.type().contentType == 'cargo';
		});
	}, this);

	this.warShips = ko.computed(function(){
		return ko.utils.arrayFilter(self.ships(), function (ship) {
			return ship.type().contentType == 'war';
		});
	}, this);
};