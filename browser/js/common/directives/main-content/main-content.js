'use strict';
app.directive('mainContent', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        // scope: {},
        templateUrl: 'js/common/directives/main-content/main-content.html',
    };

});

app.controller('RepoShowController', function($scope, GitHubProfileReposFactory){
	$scope.profileRepos = [];

		function profileReposFulfilled(profileRepos) {

			profileRepos.data.forEach(function(repo){
				var repoObj = {};
				repoObj.name = repo.name;
				repoObj.language = repo.language;
				repoObj.description = repo.description;
				repoObj.url = repo.html_url;
				repoObj.created = repo.created_at;
				repoObj.lastUpdated = repo.updated_at;
				repoObj.watchers = repo.watchers_count;
				repoObj.forks = repo.forks_count;

				$scope.profileRepos.push(repoObj);
			});
		}
		function rejected(error){
			console.log(error);
		}

	GitHubProfileReposFactory.getUserRepos().then(profileReposFulfilled, rejected);

});