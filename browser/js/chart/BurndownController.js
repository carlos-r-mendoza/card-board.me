app.config(function ($stateProvider, ChartJsProvider) {
    $stateProvider.state('chart', {
        url: '/:owner/:name/chart',
        templateUrl: 'js/chart/chart.html',
        controller: 'BurndownController'
    });

    ChartJsProvider.setOptions({
    	colours: ['#03a9f4', '#424242'],
    	scaleShowGridLines: false,
    	scaleShowHorizontalLines: false,
    	scaleShowVertialLines: false
    });
});

app.controller('BurndownController', function($scope, $rootScope, $stateParams, RepoFactory){

	$rootScope.repoName = $stateParams.name; //gives navbar.html access to project name
	$rootScope.repoOwner = $stateParams.owner; //gives navbar.html access to project owner
	$scope.dueDates = [];
	$scope.startDates = [];
	$scope.today = new Date().toDateString();
	$scope.lineSeries = ['Expected', 'Progress'];
	$scope.barSeries = ['Open', 'Closed'];

	function err(error){
		console.log(error);
	}

	RepoFactory.getRepoMilestones($stateParams).then(function(info){
		$scope.milestones = info.data;
		$scope.totalIssues = 0;
		$scope.totalOpen = 0;
		$scope.totalClosed = 0;
		$scope.barLabels = [];
		$scope.open = [];
		$scope.closed = [];
		
		angular.forEach($scope.milestones, function(milestone){
			if(milestone.due_on !== null){
				$scope.dueDates.push(milestone.due_on);
			}
			$scope.startDates.push(new Date(milestone.created_at).toDateString());
			
			$scope.totalOpen += milestone.open_issues; 
			$scope.totalClosed += milestone.closed_issues;

			$scope.barLabels.push(milestone.title);
			$scope.open.push(milestone.open_issues);
			$scope.closed.push(milestone.closed_issues);

		});
		
		$scope.startDay = new Date($scope.startDates.sort()[0]).toDateString();
		
		$scope.dueDay = new Date($scope.dueDates[$scope.dueDates.length-1]).toDateString();
		
		$scope.totalIssues = $scope.totalClosed + $scope.totalOpen;
		
		$scope.lineLabels = [$scope.startDay, $scope.today, $scope.dueDay];
	
		$scope.lineData = [
			[$scope.totalIssues, ($scope.totalIssues/2), 0],
			[$scope.totalIssues, $scope.totalOpen, 0]
		];
		
		$scope.barData = [
			$scope.open,
			$scope.closed
		];

		$scope.showChart = function(milestone){
			var idx = $scope.barLabels.indexOf(milestone);
			if(idx < 0){
				$scope.lineData = [
					[$scope.totalIssues, ($scope.totalIssues/2), 0],
					[$scope.totalIssues, $scope.totalOpen, 0]
				];
			}
			else{
				var open = $scope.open[idx];
				var closed = $scope.closed[idx];
				var total = open + closed;
				$scope.lineData = [
					[total, (total/2), 0],
					[total, open, 0]
				];
			}
		};

	}, err);
	
});

