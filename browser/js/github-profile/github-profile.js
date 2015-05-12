'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('github-profile', {
        url: '/github-profile',
        templateUrl: 'js/github-profile/github-profile.html',
        controller: 'GitHubProfileController'
    });
});

app.factory('GitHubProfileFactory', function($http){
	return {
		getUserInfo: function (){
			return $http.get('api/github-profile/username').then(function(profileData){
				return profileData;
			});
		}
	};

});

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


app.controller('GitHubProfileController', function($scope, GitHubProfileFactory, GitHubProfileEventsFactory, GitHubProfileReposFactory) {

	$scope.profile = {};
	$scope.profileEvents = [];
	$scope.profileRepos = [];
	$scope.collaborators = "";
	$scope.repoNameOnNavbar = "Hello";
	//$scope.searchResults=[];

	$scope.placeRepoNameOnNavbar = function(repoName) {
		$scope.repoNameOnNavbar = repoName;
	}


		function profileFulfilled(profileData) {
			$scope.info = profileData;
			$scope.profile.name = profileData.data.name;
			$scope.profile.name = profileData.data.name;
			$scope.profile.username = profileData.data.login;
			$scope.profile.avatar = profileData.data.avatar_url;
			$scope.profile.email = profileData.data.email;
			$scope.profile.company = profileData.data.company;
			$scope.profile.location = profileData.data.location;
			$scope.profile.gitHubProfileLink = profileData.data.html_url;
			$scope.profile.publicRepos = profileData.data.public_repos;

		}
		function rejected(error){
			console.log(error);
		}
	
		function profileEventsFulfilled(profileEvents) {

			profileEvents.data.forEach(function(event){
				var eventObj = {};

				eventObj.type = event.type;
				eventObj.repo = event.repo.name;
				eventObj.date = event.created_at;
				if(eventObj.type === "PushEvent") {
					eventObj.message = event.payload.commits[0].message;
				} else { eventObj.message = ""; }
			
			$scope.profileEvents.push(eventObj);
			
			});
		}
	
		function profileReposFulfilled(profileRepos) {
			profileRepos.data.forEach(function(repo){
				var repoObj = {};
				repoObj.name = repo.name;
				repoObj.full_name = repo.full_name;
				repoObj.language = repo.language;
				repoObj.description = repo.description;
				repoObj.url = repo.html_url;
				repoObj.created = repo.created_at;
				repoObj.lastUpdated = repo.updated_at;
				repoObj.watchers = repo.watchers_count;
				repoObj.forks = repo.forks_count;
				repoObj.owner = repo.owner.login;

				$scope.profileRepos.push(repoObj);
			
			});
			
		}

				function profileReposCollaboratorsFulfilled(profileRepos) {

							$scope.collaborators = profileRepos;

		}



		GitHubProfileFactory.getUserInfo().then(profileFulfilled, rejected);
		GitHubProfileEventsFactory.getUserEvents().then(profileEventsFulfilled, rejected);
		GitHubProfileReposFactory.getUserRepos().then(profileReposFulfilled, rejected);

	});