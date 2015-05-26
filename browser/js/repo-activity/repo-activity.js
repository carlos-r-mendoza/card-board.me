'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('repo-activity', {
        url: '/:owner/:name/repo-activity/:pageNumber',
        templateUrl: 'js/repo-activity/repo-activity.html',
        controller: 'RepoActivityController'
    });
});

app.controller('RepoActivityController', function ($scope, $rootScope, $stateParams, RepoFactory) {
	$rootScope.repoName = $stateParams.name; //gives navbar.html access to project name
	$rootScope.repoOwner = $stateParams.owner; //gives navbar.html access to project owner
	$scope.$parent.tabs[2].ifSelected = "tab-active";

	var pageCounter = 1;

	$scope.getNext30 = function() {
		pageCounter++;
		RepoFactory.getRepoEvents($stateParams, pageCounter).then(repoEventsFulfilled, rejected);
	};

	RepoFactory.getRepoEvents($stateParams, pageCounter).then(repoEventsFulfilled, rejected);

	function repoEventsFulfilled(repoEvents) {
		repoEvents.data.forEach(function(event){
			var indx = event.type.indexOf("Even");

			var name = event.type.slice(0, indx);
			console.log("name", name, indx)
			event.type = name;

		});
		$scope.repoEvents = repoEvents.data;
	}

	function rejected(error) {
		console.log(error);
	}

	//push has commits, each commit has a message
	//pull has action (closed), pull_request.title

});