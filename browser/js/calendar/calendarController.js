app.config(function($stateProvider){
	  $stateProvider.state('cal', {
        url: '/cal/:owner/:name',
        templateUrl: 'js/calendar/calendar.html',
        controller: 'CalendarController'
    	});
});

app.controller('CalendarController', function($scope, $stateParams, $compile, RepoFactory, uiCalendarConfig){
    
    $scope.eventSource = [];

    function err(error){
    	console.log(error);
    }

    RepoFactory.getRepoMilestones($stateParams).then(function(info){
    	$scope.milestones = info.data;
    	angular.forEach($scope.milestones, function(milestone){
    		$scope.eventSource.push({
    			title: milestone.title,
    			start: new Date(milestone.created_at).toDateString(),
    			end: new Date(milestone.due_on).toDateString()
    		});
    	});
    	console.log('EVENTS', $scope.eventSource);
    }, err);

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        }
      }
    };

});