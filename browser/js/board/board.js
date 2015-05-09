'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board/:repoName',
        templateUrl: 'js/board/board.html',
        controller: 'BoardController'
    });
});

app.factory('BoardFactory', function($http, $stateParams){
	return{
		getFeatures: function(feature){
			return $http.get('api/board/' + $stateParams.repoName).then(function(feature){
				return feature; 
			});
		},
		addTasktoColumn: function(board, col, task){
			angular.forEach(board.columns, function(task){
				board.col.push({
					title: task.title,
					body: task.body,
					comments: task.comments,
					assignee: task.assignee,
					status: col,
					label: task.label,
					dueDate: task.dueDate
				});
			});
		},
		removeCardFromColumn: function(column, task){
			// angular.forEach(columns, function(col){
			// 	col.splice(col.indexOf(task), 1);
			// 	});
		},
		addFeature: function(board, newFeature){
			board.features.push(newFeature);
		},
		addStatus: function(board, featureName, status){
			angular.forEach(board.features, function(feature){
				if(feature.title === featureName){
					feature.task.status.push(status);
				}
			});
		},
		addTaskToFeature: function(board, featureName, statusName, task){
			angular.forEach(board.features, function(feature){
				if(feature.title === featureName){
					angular.forEach(feature.task, function (status){
						if (task.title === task){
							feature.task.push(task);
						}
					});
				}
			});
		}
	};
});


app.controller('BoardController', function($scope, $stateParams, $state, $modal, RepoInfoFactory, BoardFactory){
	
	$scope.columns = {};
	

	$scope.boardFeatures = BoardFactory.getFeatures();


	$scope.dragOptions = {

		accept: function(sourceItemHandleScope, destSortableScope, destItemScope){
			return sourceItemHandleScope.itemScope.sortableScope.$parent.$parent.backlog.$$hashKey === destSortableScope.$parent.$parent.backlog.$$hashKey;
		},
		itemMoved: function(event){
			event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
		},
		orderChanged: function(event){},
		containment: '#board'
	};

	$scope.removeCard = function(column, task){
		BoardFactory.removeCard(column, task);
	};	

	$scope.addNewCard = function(column){
		BoardFactory.addNewCard($scope, column);
	};

	$scope.features = [{
		featureName: 'User',
		task: [
		{
			title: "Schema",
			owner: 'Katrina',
			status: 'In Progress'
		},{
			title: "HTML",
			owner: 'Ryan',
			status: 'In Progress'
		}

		],
		dueDate: 'May 30'
	},
	{featureName: 'Product',
		task: [
		{
			title: "Schema",
			owner: 'Katrina',
			status: 'In Progress'
		},{
			title: "HTML",
			owner: 'Ryan',
			status: 'In Progress'
		}

		],
		dueDate: 'May 20'
	}];
});