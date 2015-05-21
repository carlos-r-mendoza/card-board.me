app.factory('ProgressFactory', function(RepoFactory, $rootScope){
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
	},
	updateBar: function(board){
	  $rootScope.xopen = this.open(board);
      $rootScope.xclosed = this.closed(board);
      $rootScope.xtotal = this.total(board);
      $rootScope.percent = ($rootScope.xclosed / $rootScope.xtotal * 100);
	}
};
});