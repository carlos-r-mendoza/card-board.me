app.factory('ProgressFactory', function(RepoFactory){
return{
	open: function(board){
		var count = 0;
		angular.forEach(board.features, function(feature){
				angular.forEach(feature.phases, function(phase){
					if(phase.name ==='Open'){
						count += phase.cards.length;	
					}	
				});
			});
		return count;
	},
	closed: function(board){
		var count = 0;
		angular.forEach(board.features, function(feature){
				angular.forEach(feature.phases, function(phase){
					if(phase.name ==='Closed'){
						count += phase.cards.length;	
					}	
				});
			});
		return count;
	},
	total: function(board){
		var count = 0;
		angular.forEach(board.features, function(feature){
				angular.forEach(feature.phases, function(phase){
						count += phase.cards.length;	
				});
			});
		return count;
	}
};
});