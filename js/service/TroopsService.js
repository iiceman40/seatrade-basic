var TroopsService = function(self){
	self.amountInCampInThisCity = function(type){
		return self.me().activeCity().camp()[type.label]().amount();
	};

	self.amountInCastleInThisCity = function(type){
		return self.me().activeCity().castle().troops()[type.label]().amount();
	};

	self.transferTroopsToCastle = function(type){
		var castle = self.me().activeCity().castle();
		self.transferTroops(type, self.me().activeCity().camp(), castle.troops(), castle.amountOfTroopsToTransfer());
	};

	self.transferTroopsToCamp = function(type){
		var castle = self.me().activeCity().castle();
		self.transferTroops(type, castle.troops(), self.me().activeCity().camp(), castle.amountOfTroopsToTransfer());
	};

	self.transferTroopsToShip = function(type){
		// TODO - from camp to ship - from ship to camp
	};

	self.transferTroops = function(type, from, to, amount){
		amount = Math.min(amount, from[type.label]().amount());
		from[type.label]().amount(from[type.label]().amount() - amount);
		to[type.label]().amount(to[type.label]().amount() + amount);
	};

	/**
	 * BATTLE
	 **/
	// TODO create max values for progress bars for each troop type
	self.attackTroops = function(attackingTroops, defendingTroops){
		var troopTypes = self.availableTroopTypes();
		var attackingTroopTypes = [];
		var defendingTroopTypes = [];
		var i;
		for(i=0; i<attackingTroopTypes.length; i++){
			self.attackWithTroopType(attackingTroopTypes[i], attackingTroops, defendingTroops);
		}
		for(i=0; i<defendingTroopTypes.length; i++){
			self.attackWithTroopType(defendingTroopTypes[i], attackingTroops, defendingTroops);
		}
	};

	self.attackWithTroopType = function(attackingTroopType, attackingTroops, defendingTroops){

	}
};