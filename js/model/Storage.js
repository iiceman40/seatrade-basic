var Storage = function (data, farm) {
	var self = this;

	this.type = ko.observable(data.type);
	this.owner = ko.observable(data.owner);
	this.capacity = ko.observable(data.capacity || 100);
	this.label = ko.observable(data.label);
	this.content = ko.observable(data.content || 0);
	this.hasStorage = ko.observable(data.hasStorage);
	this.price = ko.observable(data.price || 1000);

	// computed
	this.isFull = ko.computed(function(){
		return (self.content() >= self.capacity());
	}, this);
};