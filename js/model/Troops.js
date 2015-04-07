var Troop = function(data){
	var self = this;

	self.amount = ko.observable(data.amount || 0);
	self.type = ko.observable(data.type);
	self.currentMax = ko.observable(data.currentMax || 0);

	self.percentageLeft = ko.computed(function(){
		self.currentMax(self.amount());
		if(self.currentMax() > 0) {
			return parseInt(self.amount()) / parseInt(self.currentMax()) * 100;
		} else {
			return 0;
		}
	}, this);
};

var Troops = function (data, availableTroopTypes) {
	var self = this;

	for(var i=0; i<availableTroopTypes.length; i++){
		var troopType = availableTroopTypes[i];
		self[troopType.label] = ko.observable(new Troop({
			amount: 0,
			type: troopType,
			currentMax: 0
		}));
	}

};