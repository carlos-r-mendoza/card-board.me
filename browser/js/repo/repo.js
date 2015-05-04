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


// app.factory('GitHubProfileFactory', function($http){
// 	return {
// 		getUserInfo: function (){
// 			return $http.get('api/repo/username').then(function(profileData){
// 				return profileData;
// 			});
// 		}
// 	};

// });

app.factory('GitHubProfileEventsFactory', function($http){
	return {
		getUserEvents: function (){
			return $http.get('api/github-profile/collaborators').then(function(profileEvents){
				return profileEvents;
			});
		}
	};

});

app.factory('GitHubProfileReposFactory', function($http){
	return {
		getUserRepos: function (){
			return $http.get('api/github-profile/repos').then(function(profileRepos){
				return profileRepos;
			});
		}
	};

});

app.factory('GitHubProfileRepoCollaboratorsFactory', function($http){
	return {
		getUserRepos: function (){
			return $http.get('api/github-profile/repos/collaborators').then(function(profileRepoCollaborators){
				return profileRepoCollaborators;
			});
		}
	};

});

app.controller('RepoController', function($scope, $stateParams, $state, GitHubProfileFactory, GitHubProfileEventsFactory, GitHubProfileReposFactory, GitHubProfileRepoCollaboratorsFactory) {
		$scope.hello = "Welcomdeee";

	// if($scope.index) {
	// $scope.name = $scope.profileRepos[$scope.index].name;
	// }
	// $scope.profile = {};
	// $scope.profileEvents = [];
	// if($scope.profileRepos.length === 0) {
		$scope.profileRepos = []; 
	// } else {
	// 			$scope.name = $scope.profileRepos[$stateParams.number];

	// }
	$scope.name = "";
	// $scope.collaborators = "";



	$scope.update = function (index) {
				

		//$state.current.data.index = index;

		console.log("PARAMS", $stateParams);
		console.log("State", $state.params);
		$scope.name = $scope.profileRepos[$stateParams.number];
		//	console.log($scope.profileRepos[index].name);
		//$scope.name.push($scope.profileRepos[index].name);
		
			

		//$state.go("repo");

	};

	$scope.news = function () {
		return "repo";
	};
	//$scope.searchResults=[];


		// function profileFulfilled(profileData) {
		// 	$scope.info = profileData;
		// 	$scope.profile.name = profileData.data.name;
		// 	$scope.profile.username = profileData.data.login;
		// 	$scope.profile.avatar = profileData.data.avatar_url;
		// 	$scope.profile.email = profileData.data.email;
		// 	$scope.profile.company = profileData.data.company;
		// 	$scope.profile.location = profileData.data.location;
		// 	$scope.profile.gitHubProfileLink = profileData.data.html_url;
		// 	$scope.profile.publicRepos = profileData.data.public_repos;

		// }
		function rejected(error){
			console.log(error);
		}
	
		// function profileEventsFulfilled(profileEvents) {

		// 	profileEvents.data.forEach(function(event){
		// 		var eventObj = {};

		// 		eventObj.type = event.type;
		// 		eventObj.repo = event.repo.name;
		// 		eventObj.date = event.created_at;
		// 		if(eventObj.type === "PushEvent") {
		// 			eventObj.message = event.payload.commits[0].message;
		// 		} else { eventObj.message = ""; }
			
		// 	$scope.profileEvents.push(eventObj);
			
		// 	});
		// }
	
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

		// 		function profileReposCollaboratorsFulfilled(profileRepos) {

		// 					$scope.collaborators = profileRepos;

		// }



		// GitHubProfileFactory.getUserInfo().then(profileFulfilled, rejected);
		// GitHubProfileEventsFactory.getUserEvents().then(profileEventsFulfilled, rejected);
		GitHubProfileReposFactory.getUserRepos().then(profileReposFulfilled, rejected);
		// GitHubProfileRepoCollaboratorsFactory.getUserRepos().then(profileReposCollaboratorsFulfilled, rejected);





	});

app.controller('RepoShowController', function($scope, $stateParams, $state, RepoInfoFactory, RepoCollaboratorsFactory, RepoCommitsFactory, RepoStatsCodeFrequencyFactory, RepoStatsCommitActivityFactory, RepoStatsContributorsFactory, RepoStatsParticipationFactory, GitHubProfileFactory, GitHubProfileEventsFactory, GitHubProfileReposFactory, GitHubProfileRepoCollaboratorsFactory){
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
	// if($scope.index) {
	// // $scope.name = $scope.profileRepos[$scope.index].name;
	// // }
	// // $scope.profile = {};
	// // $scope.profileEvents = [];
	// // if($scope.profileRepos.length === 0) {
	// 	$scope.profileRepos = []; 
	// // } else {
	// // 			$scope.name = $scope.profileRepos[$stateParams.number];

	// // }
	// $scope.name = "";
	// // $scope.collaborators = "";



	// $scope.update = function (index) {
				
	// 	console.log("Repos", $scope.profileRepos);
	// 	//$state.current.data.index = index;

	// 	console.log("PARAMS", $stateParams);
	// 	//console.log("State", $scope.profileRepos.name.indexOf("wikistack"));
		
	// 	// $scope.profileRepos.map(function(profileRepo){


	// 	// 	if(profileRepo.name === $stateParams.name){	
	// 	// 		$scope.name = $stateParams.name;
	// 	// 		console.log("HERERER", $scope.name);
	// 	// 	};

	// 	// })
		
		
	// 	console.log("AGDSA", $scope.name);//	console.log($scope.profileRepos[index].name);
	// 	//$scope.name.push($scope.profileRepos[index].name);
		
			

	// 	//$state.go("repo");

	// };

	// $scope.news = function () {
	// 	return "repo";
	// };
	// //$scope.searchResults=[];


	// 	// function profileFulfilled(profileData) {
	// 	// 	$scope.info = profileData;
	// 	// 	$scope.profile.name = profileData.data.name;
	// 	// 	$scope.profile.username = profileData.data.login;
	// 	// 	$scope.profile.avatar = profileData.data.avatar_url;
	// 	// 	$scope.profile.email = profileData.data.email;
	// 	// 	$scope.profile.company = profileData.data.company;
	// 	// 	$scope.profile.location = profileData.data.location;
	// 	// 	$scope.profile.gitHubProfileLink = profileData.data.html_url;
	// 	// 	$scope.profile.publicRepos = profileData.data.public_repos;

	// 	// }


	
	// 	// function profileEventsFulfilled(profileEvents) {

	// 	// 	profileEvents.data.forEach(function(event){
	// 	// 		var eventObj = {};

	// 	// 		eventObj.type = event.type;
	// 	// 		eventObj.repo = event.repo.name;
	// 	// 		eventObj.date = event.created_at;
	// 	// 		if(eventObj.type === "PushEvent") {
	// 	// 			eventObj.message = event.payload.commits[0].message;
	// 	// 		} else { eventObj.message = ""; }
			
	// 	// 	$scope.profileEvents.push(eventObj);
			
	// 	// 	});
	// 	// }
	
	// 	// function profileReposFulfilled(profileRepos) {
	// 	// 	profileRepos.data.forEach(function(repo){
	// 	// 		var repoObj = {};
	// 	// 		repoObj.name = repo.name;
	// 	// 		repoObj.language = repo.language;
	// 	// 		repoObj.description = repo.description;
	// 	// 		repoObj.url = repo.html_url;
	// 	// 		repoObj.created = repo.created_at;
	// 	// 		repoObj.lastUpdated = repo.updated_at;
	// 	// 		repoObj.watchers = repo.watchers_count;
	// 	// 		repoObj.forks = repo.forks_count;

	// 	// 		$scope.profileRepos.push(repoObj);
			
	// 	// 	});

	// 	// 	$scope.update();
			
	// 	// }


	// 		// $scope.update();
			
	// 	}

	// 	// 		function profileReposCollaboratorsFulfilled(profileRepos) {

	// 	// 					$scope.collaborators = profileRepos;

	// 	// }



	// 	// GitHubProfileFactory.getUserInfo().then(profileFulfilled, rejected);
	// 	// GitHubProfileEventsFactory.getUserEvents().then(profileEventsFulfilled, rejected);
	// 	//GitHubProfileReposFactory.getUserRepos().then(profileReposFulfilled, rejected);
	// 	// GitHubProfileRepoCollaboratorsFactory.getUserRepos().then(profileReposCollaboratorsFulfilled, rejected);
