var mainModel;

$('document').ready(function(){

	var MainModel = function () {
		var self = this;

		/**
		 * OBSERVABLE ARRAYS
		 */
		this.players = ko.observableArray([]);
		this.cities = ko.observableArray([]);
		this.areas = ko.observableArray([
			{label: 'city'},
			{label: 'farm'},
			{label: 'docks'},
			{label: 'castle'},
			{label: 'rent a dragon'},
			{label: 'tavern'},
			{label: 'market'}
		]);
		this.availableParcelTypes = ko.observableArray([
			{label: 'wheat', price: ko.observable(10)},
			{label: 'bananas', price: ko.observable(30)},
			{label: 'grapes', price: ko.observable(50)}
		]);
		this.availableShipTypes = ko.observableArray([
			{label: 'small freighter', contentType: 'cargo', capacity: 1000, price: ko.observable(10000)},
			{label: 'medium freighter', contentType: 'cargo', capacity: 2000, price: ko.observable(30000)},
			{label: 'frigate', contentType: 'war', capacity: 150, price: ko.observable(50000)}
		]);
		this.availableTroopTypes = ko.observableArray([
			{label: 'swordsman', price: ko.observable(50), attack: 100},
			{label: 'archer', price: ko.observable(100), attack: 200},
			{label: 'barbarian', price: ko.observable(150), attack: 300},
			{label: 'knight', price: ko.observable(200), attack: 400},
			{label: 'musketeer', price: ko.observable(250), attack: 500}
		]);


		/**
		 * OBSERVABLES
		 */
		this.selectedParcelType = ko.observable(self.availableParcelTypes()[0]);
		this.selectedWarehouse = ko.observable();
		this.eta = ko.observable(3000);


		/**
		 * METHODS/FUNCTIONS
		 */
		this.goTo = function(area){
			if(!self.selectedWarehouse()){
				self.selectedWarehouse(self.myStoragesInThisCity()[0]);
			}

			self.me().activeArea(area);
		};

		/**
		 * SERVICES
		 */
		var farmService = new FarmService(self);
		var storageService = new StorageService(self);
		var marketService = new MarketService(self);
		var shipService = new ShipService(self);
		var troopsService = new TroopsService(self);


		/**
		 * COMPUTED OBSERVABLES
		 */
		this.me = ko.computed(function(){
			var meArray = ko.utils.arrayFilter(self.players(), function(player) {
				return player.isMe();
			});
			return meArray[0];
		});

		this.myWarehousesInThisCity = ko.computed(function(){
			if(self.me() && self.me().activeCity()) {
				return ko.utils.arrayFilter(self.me().activeCity().docks().storages(), function (storage) {
					return storage.owner() == self.me();
				});
			} else {
				return [];
			}
		}, this);

		this.myWarehousesInThisCityByLabel = ko.computed(function(){
			var warehouses = self.myWarehousesInThisCity();
			var warehouseLabels = [];
			for(var i=0; i<warehouses.length; i++){
				warehouseLabels.push(warehouses[i].label());
			}
			return warehouseLabels;
		}, this);

		this.availableWarehouseTypesInThisCity = ko.computed(function(){
			return ko.utils.arrayFilter(self.availableParcelTypes(), function(type) {
				return !self.meOwnsStorageOfThisTypeInThisCity(type);
			});
		});

	};

	mainModel = new MainModel();

	// init
	var usedCityNames = [];
	var numberOfCities = 10;

	for(var i=0; i<numberOfCities; i++){
		var newCityName = cityNames[Math.floor(Math.random()*cityNames.length)];
		while(usedCityNames.indexOf(newCityName) != -1){
			newCityName = cityNames[Math.floor(Math.random()*cityNames.length)];
		}
		usedCityNames.push(newCityName);

		var newCity = new City({
			name: newCityName
		}, mainModel.availableParcelTypes(), mainModel.availableTroopTypes());

		newCity.castle().troops().swordsman().amount(1999);

		mainModel.cities.push(newCity);
	}

	mainModel.players.push(new Player({
		name: 'Player1',
		isMe: true,
		money: 1000000,
		activeArea: mainModel.areas()[0],
		activeCity: mainModel.cities()[0]
	}));

	var startingWarehouse = mainModel.me().activeCity().docks().createWarehouse(mainModel.availableParcelTypes()[0], mainModel.me());
	startingWarehouse.content(900);
	mainModel.me().activeCity().docks().storages.push(startingWarehouse);
	var startingWarehouse2 = mainModel.me().activeCity().docks().createWarehouse(mainModel.availableParcelTypes()[1], mainModel.me());
	startingWarehouse2.content(900);

	mainModel.me().activeCity().docks().storages.push(startingWarehouse2);
	mainModel.buyShip(mainModel.availableShipTypes()[0]);
	mainModel.buyShip(mainModel.availableShipTypes()[0]);
	mainModel.cities()[0].castle().owner(mainModel.me());


	mainModel.players.push(new Player({
		name: 'Player2',
		isMe: false,
		activeArea: mainModel.areas()[0],
		activeCity: mainModel.cities()[1]
	}));

	ko.applyBindings(mainModel);

});


/**
 * HELPER
 */
function round(value) {
	var decimals = 2;
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}