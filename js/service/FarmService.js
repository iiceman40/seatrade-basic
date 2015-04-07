var FarmService = function(self){

	self.selectParcelType = function(parcelType){
		self.selectedParcelType(parcelType);
	};

	self.selectParcel = function(parcel){
		if(!parcel.owner()) {
			// buy this parcel
			if(self.me().buy(parcel)) {
				parcel.owner(self.me());
			}
		} else if(parcel.owner() == self.me()) {
			if(parcel.type() == self.selectedParcelType()){
				if(parcel.storage()){
					// if already is storage, remove storage
					if (confirm("Remove Storage from this parcel? (no refunds)") == true) {
						parcel.stopHarvesting();
						self.me().activeCity().farm().storages.remove(parcel);
						parcel.storage(null);
						parcel.startHarvesting();
					}
				} else {
					// place storage
					var newBarn = new Storage({label: 'barn'});
					if(self.me().buy(newBarn)){
						parcel.storage(newBarn);
						self.me().activeCity().farm().storageParcels.push(parcel);
					}
					parcel.stopHarvesting();
				}
			} else {
				// plant selected type on parcel
				var parcelType = self.selectedParcelType();
				if(self.me().buy(parcelType)){
					parcel.type(parcelType);
				}
				parcel.startHarvesting();
			}
		}
	};
}