var Castle = function (data, availableTroopTypes) {
	this.owner = ko.observable(data.owner);
	this.defense = ko.observable(10);

	this.amountOfTroopsToTransfer = ko.observable(10);

	this.troops = ko.observable(new Troops(data.troops | {}, availableTroopTypes));
};