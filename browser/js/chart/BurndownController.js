app.config(function ($stateProvider) {
    $stateProvider.state('chart', {
        url: '/chart/:owner/:name',
        templateUrl: 'js/chart/chart.html',
        controller: 'BurndownController'
    });
});

app.controller('BurndownController', function($scope, $stateParams, RepoFactory){
	
	$scope.dueDates = [];
	$scope.startDates = [];
	$scope.today = new Date().toDateString();
	$scope.series = ['Expected', 'Progress'];

	function err(error){
		console.log(error);
	}

	RepoFactory.getRepoMilestones($stateParams).then(function(info){
		$scope.milestones = info.data;
		$scope.totalIssues = 0;
		$scope.totalOpen = 0;
		$scope.totalClosed = 0;
		
		angular.forEach($scope.milestones, function(milestone){
			if(milestone.due_on !== null){
				$scope.dueDates.push(milestone.due_on);
			}
			$scope.startDates.push(new Date(milestone.created_at).toDateString());
			
			$scope.totalOpen += milestone.open_issues; 
			$scope.totalClosed += milestone.closed_issues;
		});
		
		$scope.startDates.sort();
		$scope.startDay = $scope.startDates[0];
		$scope.startDay.toDateString;
		
		$scope.dueDay = new Date($scope.dueDates[$scope.dueDates.length-1]).toDateString();
		
		$scope.totalIssues = $scope.totalClosed + $scope.totalOpen;
		
		$scope.labels = [$scope.startDay, $scope.today, $scope.dueDay];
	
		$scope.data = [
			[$scope.totalIssues, ($scope.totalIssues/2), 0],
			[$scope.totalIssues, $scope.totalOpen, 0]
		];
		
		console.log('DATA', $scope.data);
		console.log('LABELS', $scope.labels);

	}, err);
	

});

