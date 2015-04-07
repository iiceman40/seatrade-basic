var StorageService = function(self){

	self.buyWarehouse = function(type){
		// check if player already owns a storage in this city
		if(self.meOwnsStorageOfThisTypeInThisCity(type)){
			alert('You already own a storage of this type');
		} else {
			var docks = self.me().activeCity().docks();
			var newWarehouse = docks.createWarehouse(type, self.me());
			if(self.me().buy(newWarehouse)){
				docks.storages.push(newWarehouse);
			}
			self.selectedWarehouse(self.myStoragesInThisCity()[0]);
		}
	};

	self.sendToWarehouse = function(parcel){
		var barn = parcel.storage();
		var type = parcel.type();
		var warehouse = self.myStorageOfThisTypeInThisCity(type);

		var newWarehouseContent = warehouse.content() + barn.content();
		if(newWarehouseContent <= warehouse.capacity()) {
			barn.content(0);
		} else {
			newWarehouseContent = warehouse.capacity();
			barn.content( barn.content() - (warehouse.capacity() - warehouse.content()) );
		}
		warehouse.content(newWarehouseContent);
	};

	self.myStoragesInThisCity = function(){
		return ko.utils.arrayFilter(self.myWarehousesInThisCity(), function (storage) {
			return (storage.owner() == self.me());
		});
	};

	self.myStorageOfThisTypeInThisCity = function(type){
		var myStoragesOfThisType = ko.utils.arrayFilter(self.myWarehousesInThisCity(), function (storage) {
			return storage.type() == type && storage.owner() == self.me();
		});
		return myStoragesOfThisType[0];
	};

	self.meOwnsStorageOfThisTypeInThisCity = function(type){
		var myStoragesOfThisType = ko.utils.arrayFilter(self.myWarehousesInThisCity(), function (storage) {
			return storage.type() == type;
		});
		return (myStoragesOfThisType.length > 0);
	};

	self.selectWarehouse = function(warehouse){
		self.selectedWarehouse(warehouse);
	};
};