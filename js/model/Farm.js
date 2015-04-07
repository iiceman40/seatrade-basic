var Farm = function () {
	var self = this;

	this.field = ko.observableArray([]);

	// computed
	this.storageParcels = ko.observableArray([]);

	// init
	var height = 5;
	var width = 10;

	// init field
	for(var y=0; y<height; y++){
		var thisRow = ko.observableArray([]);
		for(var x=0; x<width; x++){
			thisRow.push(new Parcel({}, self));
		}
		self.field().push(thisRow);
	}


};