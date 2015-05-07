'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('repo', {
        url: '/repo/:name',
        templateUrl: 'js/repo/repo.html',
        controller: 'RepoShowController'
    });
});

app.factory('RepoInfoFactory', function($http){
				

	return {
		getRepoInfo: function (repoName){
			return $http.get('api/repo/repo/' + repoName).then(function(repoInfo){
				return repoInfo;
			});
		},
		getRepoCollaborators: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/collaborators").then(function(repoCollaborators){
				return repoCollaborators;
			});
		},
		getRepoCommits: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/commits").then(function(repoCommits){
				return repoCommits;
			});
		},
		getStatsCodeFrequency: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsCodeFrequency").then(function(statsCodeFrequency){
				return statsCodeFrequency;
			});
		},
		getStatsCommitActivity: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsCommitActivity").then(function(statsCommitActivity){
				return statsCommitActivity;
			});
		},
		getStatsContributors: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsContributors").then(function(statsContributors){
				return statsContributors;
			});
		},
		getStatsParticipation: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsParticipation").then(function(statsParticipation){
				return statsParticipation;
			});
		}
	};
})



app.controller('RepoShowController', function($scope, $stateParams, $state, RepoInfoFactory){
	$scope.hello = "Welcomes";

		function repoInfoFulfilled(repoInfo) {
		
		$scope.repoInfo = repoInfo;

		// profileRepos.data.forEach(function(repo){
		// 	var repoObj = {};
		// 	repoObj.name = repo.name;
		// 	repoObj.language = repo.language;
		// 	repoObj.description = repo.description;
		// 	repoObj.url = repo.html_url;
		// 	repoObj.created = repo.created_at;
		// 	repoObj.lastUpdated = repo.updated_at;
		// 	repoObj.watchers = repo.watchers_count;
		// 	repoObj.forks = repo.forks_count;

		// 	$scope.profileRepos.push(repoObj);
		}

		function repoCollaboratorsFulfilled(repoCollaborators) {
		 $scope.collaborators = repoCollaborators;
		}

		function repoCommitsFulfilled(repoCommits) {
		 $scope.commits = repoCommits;
		}

		function statsCodeFrequencyFulfilled(statsCodeFrequency) {
			$scope.stats = statsCodeFrequency;
		}

		function statsCommitActivityFulfilled(statsCommitActivity) {
			$scope.statsCommit = statsCommitActivity.data[statsCommitActivity.data.length-1];
		}

		function statsContributorsFulfilled(statsContributors) {
			$scope.statsContributors = statsContributors;
		}

		function statsParticipationFulfilled(statsParticipation) {
			$scope.statsParticipation = statsParticipation;
		}


		function rejected(error){
			console.log(error);
		}
			console.log("YO")
		
		RepoInfoFactory.getRepoInfo($stateParams.name).then(repoInfoFulfilled, rejected);
		RepoInfoFactory.getRepoCollaborators($stateParams.name).then(repoCollaboratorsFulfilled, rejected);
		RepoInfoFactory.getRepoCommits($stateParams.name).then(repoCommitsFulfilled, rejected);
		RepoInfoFactory.getStatsCodeFrequency($stateParams.name).then(statsCodeFrequencyFulfilled, rejected);
		RepoInfoFactory.getStatsCommitActivity($stateParams.name).then(statsCommitActivityFulfilled, rejected);
		RepoInfoFactory.getStatsContributors($stateParams.name).then(statsContributorsFulfilled, rejected);
		RepoInfoFactory.getStatsParticipation($stateParams.name).then(statsParticipationFulfilled, rejected);



});