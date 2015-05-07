'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board/:name',
        templateUrl: 'js/board/board.html',
        controller: 'BoardController'
    });
});

app.factory('BoardFactory', function($http){
	return{
		getFeatures: function(repo){
			return $http.get('api/board/'+repoName).then(function(repo){
				return repo; 
			})
		}
	}
})

app.controller('BoardController', function($scope, $stateParams, $state, RepoInfoFactory){
	$scope.dragControlListeners = {
		accept: function(sourceItemHandleScope, destSortableScope){
			return true
		},
		itemMoved: function(event){ return SOMETHING},
		orderChanged: function(event){return SOMETHING},
		containment: '#board'
	};

	$scope.board = 'SOMETHING'

	$scope.features = {
		featureName: 'User',
		task: [
		{
			toDo: "Schema",
			owner: 'Katrina',
			status: 'In Progress'
		},{
			toDo: "HTML",
			owner: 'Ryan',
			status: 'In Progress'
		}

		],
		//dueDate: {'May 30'}
	}
});