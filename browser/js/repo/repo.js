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
		}
	};
})

app.factory('RepoCollaboratorsFactory', function($http){
				

	return {
		getRepoCollaborators: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/collaborators").then(function(repoCollaborators){
				return repoCollaborators;
			});
		}
	};
})

app.factory('RepoCommitsFactory', function($http){
				

	return {
		getRepoCommits: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/commits").then(function(repoCommits){
				return repoCommits;
			});
		}
	};
})

app.factory('RepoStatsCodeFrequencyFactory', function($http){
				

	return {
		getStatsCodeFrequency: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsCodeFrequency").then(function(statsCodeFrequency){
				return statsCodeFrequency;
			});
		}
	};
})

app.factory('RepoStatsCommitActivityFactory', function($http){
				

	return {
		getStatsCommitActivity: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsCommitActivity").then(function(statsCommitActivity){
				return statsCommitActivity;
			});
		}
	};
})

app.factory('RepoStatsContributorsFactory', function($http){
				

	return {
		getStatsContributors: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsContributors").then(function(statsContributors){
				return statsContributors;
			});
		}
	};
})

app.factory('RepoStatsParticipationFactory', function($http){
				

	return {
		getStatsParticipation: function (repoName){
			return $http.get('api/repo/repo/' + repoName +"/statsParticipation").then(function(statsParticipation){
				return statsParticipation;
			});
		}
	};
})


app.controller('RepoShowController', function($scope, $stateParams, $state, RepoInfoFactory, RepoCollaboratorsFactory, RepoCommitsFactory, RepoStatsCodeFrequencyFactory, RepoStatsCommitActivityFactory, RepoStatsContributorsFactory, RepoStatsParticipationFactory){
	$scope.hello = "Welcomes";
	console.log("WHAT", $stateParams)


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
		
		console.log("HARESEGDFAGA")
		 $scope.collaborators = repoCollaborators;
		}

		function repoCommitsFulfilled(repoCommits) {
		
		console.log("HARESEGDFAGA")
		 $scope.commits = repoCommits;
		}

		function statsCodeFrequencyFulfilled(statsCodeFrequency) {
			$scope.stats = statsCodeFrequency;
		}

		function statsCommitActivityFulfilled(statsCommitActivity) {
			console.log("STATTS", statsCommitActivity )
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
		RepoCollaboratorsFactory.getRepoCollaborators($stateParams.name).then(repoCollaboratorsFulfilled, rejected);
		RepoCommitsFactory.getRepoCommits($stateParams.name).then(repoCommitsFulfilled, rejected);
		RepoStatsCodeFrequencyFactory.getStatsCodeFrequency($stateParams.name).then(statsCodeFrequencyFulfilled, rejected);
		RepoStatsCommitActivityFactory.getStatsCommitActivity($stateParams.name).then(statsCommitActivityFulfilled, rejected);
		RepoStatsContributorsFactory.getStatsContributors($stateParams.name).then(statsContributorsFulfilled, rejected);
		RepoStatsParticipationFactory.getStatsParticipation($stateParams.name).then(statsParticipationFulfilled, rejected);



});