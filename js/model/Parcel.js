var Parcel = function (data, farm) {
	var self = this;

	this.owner = ko.observable(data.owner);
	this.farm = ko.observable(data.farm);
	this.type = ko.observable(data.type || {label: 'empty'});
	this.storage = ko.observable(data.storage);
	this.price = ko.observable(data.price || 100);

	this.infoVisible = ko.observable(false);

	this.harvesting = null;

	// methods
	this.showInfo = function() {
		this.infoVisible(true);
	};

	this.hideInfo = function() {
		this.infoVisible(false);
	};

	this.startHarvesting = function(){
		self.harvesting = setInterval(function(){
			if(!self.storage()) {
				var storageParcelsOfThisType = ko.utils.arrayFilter(farm.storageParcels(), function (storage) {
					return storage.type() == self.type();
				});

				if (storageParcelsOfThisType.length) {
					// find storage with free space
					var storage = null;
					var i = 0;
					while (!storage && i < storageParcelsOfThisType.length) {
						var oldContent = storageParcelsOfThisType[i].storage().content();
						var capacity = storageParcelsOfThisType[i].storage().capacity();
						if (oldContent < capacity) {
							storage = storageParcelsOfThisType[i].storage();
						} else {
							i++;
						}
					}

					if (storage) {
						storage.content(oldContent + 1);
					}
				}
			}
		}, 3000);
	};

	this.stopHarvesting = function(){
		if(this.harvesting) {
			clearTimeout(this.harvesting);
		}
	}
};