var Ship = function (data) {
	var self = this;

	this.name = ko.observable(data.name);
	this.owner = ko.observable(data.owner);
	this.type = ko.observable(data.type);
	this.content = ko.observable(data.content || {});
	this.selectedForTraveling = ko.observable(data.content || false);

	// methods
	this.toggleSelectForTraveling = function(){
		self.selectedForTraveling(!self.selectedForTraveling());
	};

	// computed
	this.contentSum = ko.computed(function(){
		var contentSum = 0;
		for (var property in self.content()) {
			if (self.content().hasOwnProperty(property)) {
				contentSum += self.content()[property];
			}
		}
		return contentSum;
	}, this);

	this.contentPercentage = ko.computed(function() {
		return self.contentSum() / self.type().capacity * 100;
	}, this);

	this.isFull = ko.computed(function(){
		var contentSum = self.contentSum();
		return (contentSum >= self.type.capacity);
	}, this);

	this.cargoAsArray = ko.computed(function(){
		var cargoArray = [];
		for (var property in self.content()) {
			if (self.content().hasOwnProperty(property)) {
				cargoArray.push({label: property, amount: self.content()[property]});
			}
		}
		return cargoArray;
	}, this);
};