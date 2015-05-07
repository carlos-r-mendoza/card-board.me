'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board',
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
		},
		addCardtoColumn: function(board, column, cardTitle, details){
			angular.forEach(board.columns, function(col){
				if(col.name === column.name){
					col.cards.push(new Card(cardTitle, column.name, details));
				}
			});
		},
		removeCardFromColumn: function(board, column, card){
			angular.forEach(board.columns, function(col){
				if(col.name === column.name){
					col.cards.splice(col.cards.indexOf(card), 1);
				}
			});
		},
		addFeature: function(board, newFeature){
			board.features.push(new Feature(newFeature));
		},
		addStatus: function(board, featureName, status){
			angular.forEach(board.features, function(feature){
				if(feature.name === featureName){
					feature.statuss.push(new Status(status.name));
				}
			});
		},
		addCardToFeature: function(board, featureName, statusName, task){
			angular.forEach(board.features, function(feature){
				if(feature.name === featureName){
					angular.forEach(feature.status, function (status){
						if (status.name === statusName){
							status.cards.push(new Card(task.title, task.status, task.details));
						}
					});
				}
			});
		}
	}
})

app.controller('BoardController', function($scope, $stateParams, $state, $modal, RepoInfoFactory, BoardFactory){
	
	$scope.board = 'SOMETHING'

	$scope.dragControlListeners = {

		accept: function(sourceItemHandleScope, destSortableScope, destItemScope){
			return sourceItemHandleScope.itemScope.sortableScope.$parent.$parent.backlog.$$hashKey === destSortableScope.$parent.$parent.backlog.$$hashKey;
		},
		itemMoved: function(event){
			event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
		},
		orderChanged: function(event){},
		containment: '#board'
	};

	$scope.removeCard = function(column, card){
		BoardFactory.removeCard($scope.board, column, card);
	}	

	$scope.addNewCard = function(column){
		BoardFactory.addNewCard($scope.board, column);
	}

	// $scope.features = {
	// 	featureName: 'User',
	// 	task: [
	// 	{
	// 		toDo: "Schema",
	// 		owner: 'Katrina',
	// 		status: 'In Progress'
	// 	},{
	// 		toDo: "HTML",
	// 		owner: 'Ryan',
	// 		status: 'In Progress'
	// 	}

	// 	],
	// 	dueDate: 'May 30'
	// }
});