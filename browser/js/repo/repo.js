'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('repo', {
        url: '/repo/:owner/:name',
        templateUrl: 'js/repo/repo.html',
        controller: 'RepoShowController'
    });
});

app.factory('RepoInfoFactory', function($http){
				

	return {
		getRepoInfo: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name).then(function(repoInfo){
				return repoInfo;
			});
		},
		getRepoCollaborators: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/collaborators").then(function(repoCollaborators){
				return repoCollaborators;
			});
		},
		getRepoCommits: function (repoInfo){
			return $http.get('api/repo/'  + repoInfo.owner + "/" + repoInfo.name + "/commits").then(function(repoCommits){
				return repoCommits;
			});
		},
		getStatsCodeFrequency: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/statsCodeFrequency").then(function(statsCodeFrequency){
				return statsCodeFrequency;
			});
		},
		getStatsCommitActivity: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/statsCommitActivity").then(function(statsCommitActivity){
				return statsCommitActivity;
			});
		},
		getStatsContributors: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/statsContributors").then(function(statsContributors){
				return statsContributors;
			});
		},
		getStatsParticipation: function (repoInfo){
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/statsParticipation").then(function(statsParticipation){
				return statsParticipation;
			});
		},
		getRepoLabels: function (repoInfo) {
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/repo-labels").then(function(repoLabels){
				return repoLabels;
			});
		},
		getRepoMilestones: function (repoInfo) {
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/repo-milestones").then(function(repoMilestones){
				return repoMilestones;
			});
		}
	};
})



app.factory('RepoIssuesFactory', function($http){
				
	return {
		getRepoIssues: function (repoInfo){
			console.log("ETAFAESG");
			return $http.get('api/repo/' +repoInfo.owner + "/" + repoInfo.name +"/repo-issues").then(function(repoIssues){
				return repoIssues;
			});
		},
		createRepoIssue: function (repoInfo, issue) {
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name +"/create-repo-issue", issue).then(function(createdRepoIssue){
				console.log("Inside angular post", createdRepoIssue);
				return createdRepoIssue;
			});
		}
	};
});






app.controller('RepoShowController', function($scope, $stateParams, $state, RepoInfoFactory, RepoIssuesFactory){
	console.log("I am state params",$stateParams);
	$scope.hello = "Welcomes";
	$scope.issue = {};
	$scope.issue.tempLabels = [];

	// issue = { body: "mytext"}

// $scope.createLabels = function(labels) {
// 	$scope.issues.labels.push(labels);
// }

  $scope.createIssue = function(issue) {
  	$scope.issue.labels = [];

  	$scope.issue.tempLabels.forEach(function (tempLabelObj) {

  		for (var label in tempLabelObj) {
  			if(tempLabelObj[label]) {
  				$scope.issue.labels.push(label);
  			}
  		}
  	});

    console.log("NEWISSUE", issue);
	RepoIssuesFactory.createRepoIssue($stateParams, issue).then(createdRepoIssueFulfilled, rejected);
  };


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
		 $scope.collaborators = repoCollaborators.data;
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


		function repoIssuesFulfilled(repoIssues) {
			 $scope.repoIssues = repoIssues;

		}

		function createdRepoIssueFulfilled(createdRepoIssue) {
			RepoIssuesFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);
		}

		function repoLabelsFulfilled(repoLabels){
			$scope.repoLabels = repoLabels.data;
		}

		function repoMilestonesFulfilled(repoMilestones){
			$scope.repoMilestones = repoMilestones.data;
		}

		function rejected(error){
			console.log(error);
		}
		
		RepoInfoFactory.getRepoInfo($stateParams).then(repoInfoFulfilled, rejected);
		RepoInfoFactory.getRepoCollaborators($stateParams).then(repoCollaboratorsFulfilled, rejected);
		RepoInfoFactory.getRepoCommits($stateParams).then(repoCommitsFulfilled, rejected);
		RepoInfoFactory.getStatsCodeFrequency($stateParams).then(statsCodeFrequencyFulfilled, rejected);
		RepoInfoFactory.getStatsCommitActivity($stateParams).then(statsCommitActivityFulfilled, rejected);
		RepoInfoFactory.getStatsContributors($stateParams).then(statsContributorsFulfilled, rejected);
		RepoInfoFactory.getStatsParticipation($stateParams).then(statsParticipationFulfilled, rejected);
		RepoIssuesFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);
		RepoInfoFactory.getRepoLabels($stateParams).then(repoLabelsFulfilled, rejected);
		RepoInfoFactory.getRepoMilestones($stateParams).then(repoMilestonesFulfilled, rejected);


});