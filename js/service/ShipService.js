var ShipService = function(self){

	self.travelToCityWithSelectedShips = function(city){
		var oldActiveCity = self.me().activeCity();
		var selectedShips = self.me().activeCity().docks().selectedShips();
		var numberOfSelectedShips = selectedShips.length;

		// check if at least on ship is selected
		if(numberOfSelectedShips > 0){
			self.me().activeCity(null);

			// TODO simulate time on sea - calculate eta and set it as self.eta() in seconds
			self.eta(1);
			var timer = setInterval(function(){
				self.eta(self.eta() - 1);

				if(self.eta() <= 0){
					// arrived
					clearInterval(timer);
					for(var i=0; i<numberOfSelectedShips; i++){
						oldActiveCity.docks().ships.remove(selectedShips[i]);
						city.docks().ships.push(selectedShips[i]);
						selectedShips[i].selectedForTraveling(false);
					}
					self.me().activeCity(city);

					var myWarehouses = self.myWarehousesInThisCity();
					if(myWarehouses.length){
						self.selectedWarehouse(myWarehouses[0]);
					} else {
						self.selectedWarehouse(null);
					}
				}
			}, 1000);
		} else {
			alert('No ships selected.')
		}

	};

	self.loadCargoOnShip = function(ship){
		var warehouse = self.selectedWarehouse();
		if(ship.type().contentType == 'cargo'){
			if(warehouse) {
				var oldShipContent = ship.content()[warehouse.type().label] || 0;
				var oldShipContentSum = ship.contentSum();
				var amountToTransfer = Math.min(self.me().activeCity().docks().amountToLoad(), warehouse.content());
				amountToTransfer = Math.min(ship.type().capacity - oldShipContentSum, amountToTransfer);

				warehouse.content(warehouse.content() - amountToTransfer);
				ship.content()[warehouse.type().label] = oldShipContent + amountToTransfer;

				ship.content.valueHasMutated();
			} else {
				alert('You don\'t have a warehouse here.');
			}
		}
		if(ship.type().contentType == 'war'){
			alert('loading troups TODO');
		}
	};

	self.unloadCargoFromShip = function(ship){
		var warehouse = self.selectedWarehouse();
		if(ship.type().contentType == 'cargo') {
			if (warehouse) {
				var cargoType = warehouse.type();
				var oldWarehouseContent = warehouse.content();
				if (ship.content()[cargoType.label]) {
					var amountToTransfer = Math.min(self.me().activeCity().docks().amountToLoad(), ship.content()[cargoType.label]);
					amountToTransfer = Math.min(warehouse.capacity() - oldWarehouseContent, amountToTransfer);

					ship.content()[warehouse.type().label] = ship.content()[cargoType.label] - amountToTransfer;
					warehouse.content(oldWarehouseContent + amountToTransfer);

					ship.content.valueHasMutated();
				}
			} else {
				alert('You don\'t have a warehouse here.');
			}
		}
		if(ship.type().contentType == 'war'){
			alert('unloading troups TODO');
		}
	};

	self.buyShip = function(shipType){
		var newShipName = shipNames[Math.floor(Math.random()*shipNames.length)];
		if(self.me().buy(shipType)) {
			self.me().activeCity().docks().ships.push(new Ship({
				type: shipType,
				name: newShipName,
				owner: mainModel.me()
			}));
		}
	}
};