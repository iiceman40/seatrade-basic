var City = function (data, parcelTypes, availableTroopTypes) {
	var self = this;

	this.name = ko.observable(data.name);
	this.farm = ko.observable(new Farm());
	this.docks = ko.observable(new Docks());
	this.castle = ko.observable(new Castle(data.castle || {}, availableTroopTypes));
	this.camp = ko.observable(new Troops(data.camp || {}, availableTroopTypes));

	this.marketAmount = ko.observable(100);
	this.marketAmountTroops = ko.observable(10);

	this.marketPrices = ko.observableArray([]);

	// init
	for(var i=0; i<parcelTypes.length; i++){
		var localParcelTypeObject = ko.toJS(parcelTypes[i]);
		var max = localParcelTypeObject.price * 1.2;
		var min = localParcelTypeObject.price * 0.8;
		var newPrice = Math.random() * (max - min) + min;
		localParcelTypeObject.price = ko.observable(newPrice.toFixed(2));
		self.marketPrices.push(localParcelTypeObject);
	}
};