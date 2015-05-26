app.config(function($stateProvider){
	  $stateProvider.state('cal', {
        url: '/cal/:owner/:name',
        templateUrl: 'js/calendar/calendar.html',
        controller: 'CalendarController'
    	});
});

app.controller('CalendarController', function($scope, $stateParams, $compile, RepoFactory, uiCalendarConfig){

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    $scope.events = [];

    function err(error){
    	console.log(error);
    }

    RepoFactory.getRepoMilestones($stateParams).then(function(info){
    	$scope.milestones = info.data;
    	angular.forEach($scope.milestones, function(milestone){
    		$scope.events.push({
    			title: milestone.title,
    			start: new Date(milestone.created_at),
    			end: new Date(milestone.due_on)
    		});
    	});
    	console.log('EVENTS', $scope.events);
    }, err);

    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    $scope.eventRender = function( event, element, view ) { 
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };

});