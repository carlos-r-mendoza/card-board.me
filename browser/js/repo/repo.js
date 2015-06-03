'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('repo', {
        url: '/repo/:owner/:name',
        templateUrl: 'js/repo/repo.html',
        controller: 'RepoController'
    });
});


app.factory('RepoFactory', function($http){		
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
		getRepoIssues: function (repoInfo){
			return $http.get('api/repo/' +repoInfo.owner + "/" + repoInfo.name + "/repo-issues").then(function(repoIssues){
				return repoIssues;
			});
		},
		getIssueComments: function (repoInfo, issueNumber) {
			return $http.get('api/repo/' +repoInfo.owner + "/" + repoInfo.name + "/repo-issue-comments/" + issueNumber).then(function(repoIssues){
				return repoIssues;
			});
		},
		createRepoIssue: function (repoInfo, issue) {
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/create-repo-issue", issue).then(function(createdRepoIssue){
				return createdRepoIssue;
			});
		},
		getRepoLabels: function (repoInfo) {
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/repo-labels").then(function(repoLabels){
				return repoLabels;
			});
		},
		createRepoLabel: function(repoInfo, labelInfo) {
			//changed labelInfo to contain both labelInfo.title and labelInfo.color - might cause error somewhere else
			if(labelInfo.title) { labelInfo.name = labelInfo.title; }
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/create-repo-label/" + labelInfo.name, labelInfo).then(function(createdLabel){
				return createdLabel;
			});
		},
		editRepoLabel: function (repoInfo, oldlabel, label) {
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/labels/"+ oldlabel, label).then(function(editedRepoLabel){
				return editedRepoLabel;
			});
			
			// return $http.post('/api/repo', {name: 'asdf', color: 'asdf'});
		},
		deleteRepoLabel: function (repoInfo, label) {
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/delete-repo-label", label).then(function(deletedRepoLabel){
				return deletedRepoLabel;
			});
		},
		getRepoMilestones: function (repoInfo) {
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/repo-milestones").then(function(repoMilestones){
				return repoMilestones;
			});
		},
		editRepoIssue: function(repoInfo, num, issue) {
			if(issue.labelNames) { issue.labels = issue.labelNames; }
			if(issue.assignee_login) { issue.assignee = issue.assignee_login; }
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/edit-repo-issue/" + num, issue).then(function(editedRepoIssue){
				return editedRepoIssue;
			});
		},
		createRepoMilestone: function(repoInfo, milestoneInfo) {
			return $http.post('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/create-repo-milestone/" + milestoneInfo.title, milestoneInfo).then(function(createdMilestone){
				return createdMilestone;
			});
		},
		deleteRepoMilestone: function(repoInfo, milestoneNumber) {
			return $http.get('api/repo/'+ repoInfo.owner+"/" + repoInfo.name + '/delete-repo-milestone/'+ milestoneNumber).then(function(deletedMilestone){
				return deletedMilestone;
			});			
		},
		createComment: function(repoInfo, issueNum, comment){
			return $http.post('api/repo/' + repoInfo.owner+ "/" + repoInfo.name + '/issues/'+ issueNum + "/comments", comment).then(function(createdComment){
				return createdComment;
			});
		},
		getRepoEvents: function (repoInfo, pageNumber) {
			return $http.get('api/repo/' + repoInfo.owner + "/" + repoInfo.name + "/repo-events/" + pageNumber).then(function(repoEvents){
				return repoEvents;
			});
		},
	};
});


app.controller('RepoController', function($scope, $stateParams, RepoFactory){

	$scope.issue = {};
	$scope.issue.tempLabels = [];
	$scope.label = {};

	$scope.createIssue = function(issue) {
		$scope.issue.labels = [];

		$scope.issue.tempLabels.forEach(function (tempLabelObj) {
			for (var label in tempLabelObj) {
				if(tempLabelObj[label]) { $scope.issue.labels.push(label); }
			}
		});
		issue.labels.push("Feature - Testing");
		RepoFactory.createRepoIssue($stateParams, issue).then(createdRepoIssueFulfilled, rejected);
	};

	$scope.editIssue = function(issue) {

			for (var obj in issue.tempLabels) {
				for (var label in issue.tempLabels[obj]) {
					for (var i = 0; i <= issue.labels.length-1; i++) {
						if(label === issue.labels[i].name) {
							 issue.tempLabels[obj][label] = false;
						}
					}
				if(issue.tempLabels[obj][label]) { issue.labels.push({ name: label}); }
				}
			}

		 RepoFactory.editRepoIssue($stateParams, issue).then(editedRepoIssueFulfilled, rejected);
	};

	$scope.createLabel = function(label) {
		RepoFactory.createRepoLabel($stateParams, label).then(createdRepoLabelFulfilled, rejected);
	};

	$scope.editLabel = function(label) {
		RepoFactory.editRepoLabel($stateParams, label).then(editedRepoLabelFulfilled, rejected);
	};

	$scope.deleteLabel = function(label) {
		RepoFactory.deleteRepoLabel($stateParams, label);
	};

	$scope.createMilestone = function(milestone) {
		RepoFactory.createRepoMilestone($stateParams, milestone).then(createdRepoMilestoneFulfilled, rejected);
	};

	$scope.checkAssignedLabels = function(repoLabel, labelsInIssue) {
		for (var i = 0; i <= labelsInIssue.length-1; i++) {
			if (repoLabel === labelsInIssue[i].name) { return true; }
		}
	};

	function issueComments(issueNumber) {
		return RepoFactory.getIssueComments($stateParams, issueNumber).then(issueCommentsFulfilled, rejected);
	}


	function repoInfoFulfilled(repoInfo) {
		$scope.repoInfo = repoInfo.data;
	}
	
	function repoCollaboratorsFulfilled(repoCollaborators) {
	 	$scope.collaborators = repoCollaborators.data;
	}

	function repoCommitsFulfilled(repoCommits) {
		$scope.commits = repoCommits.data;
	}

	function statsCodeFrequencyFulfilled(statsCodeFrequency) {
		$scope.stats = statsCodeFrequency.data;
	}

	function statsCommitActivityFulfilled(statsCommitActivity) {
		$scope.statsCommit = statsCommitActivity.data[statsCommitActivity.data.length-1];
	}

	function statsContributorsFulfilled(statsContributors) {
		$scope.statsContributors = statsContributors.data;
	}

	function statsParticipationFulfilled(statsParticipation) {
		$scope.statsParticipation = statsParticipation.data;
	}
	
	function repoIssuesFulfilled(repoIssues) {

		repoIssues.data.forEach(function(issue){
			issueComments(issue.number).then(function (issueCommentsData){
				issue.comments_info = issueCommentsData;
			}, rejected);
		});
		$scope.repoIssues = repoIssues.data;
	}

	function issueCommentsFulfilled(repoIssue) {
		return repoIssue.data;
	}

	function createdRepoIssueFulfilled(createdRepoIssue) {
		//RepoFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);
	}

	function repoLabelsFulfilled(repoLabels){
		$scope.repoLabels = repoLabels.data;
	}

	function editedRepoLabelFulfilled(editedRepoLabel) {
		RepoFactory.getRepoLabels($stateParams).then(repoLabelsFulfilled, rejected);
	}

	function repoMilestonesFulfilled(repoMilestones){
		$scope.repoMilestones = repoMilestones.data;
	}

	function editedRepoIssueFulfilled(editedRepoIssue) {
		RepoFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);		
	}

	function createdRepoLabelFulfilled(editedRepoIssue) {
		RepoFactory.getRepoLabels($stateParams).then(repoLabelsFulfilled, rejected);
	}

	function createdRepoMilestoneFulfilled(editedRepoIssue) {
		RepoFactory.getRepoMilestones($stateParams).then(repoMilestonesFulfilled, rejected);
	}

	function rejected(error){
		console.log(error);
	}

	RepoFactory.getRepoInfo($stateParams).then(repoInfoFulfilled, rejected);
	RepoFactory.getRepoCollaborators($stateParams).then(repoCollaboratorsFulfilled, rejected);
	RepoFactory.getRepoCommits($stateParams).then(repoCommitsFulfilled, rejected);
	RepoFactory.getStatsCodeFrequency($stateParams).then(statsCodeFrequencyFulfilled, rejected);
	RepoFactory.getStatsCommitActivity($stateParams).then(statsCommitActivityFulfilled, rejected);
	RepoFactory.getStatsContributors($stateParams).then(statsContributorsFulfilled, rejected);
	RepoFactory.getStatsParticipation($stateParams).then(statsParticipationFulfilled, rejected);
	RepoFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);
	RepoFactory.getRepoLabels($stateParams).then(repoLabelsFulfilled, rejected);
	RepoFactory.getRepoMilestones($stateParams).then(repoMilestonesFulfilled, rejected);

});