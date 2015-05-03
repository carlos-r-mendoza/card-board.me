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

app.controller('GitHubProfileController', function($scope, GitHubProfileFactory) {

	$scope.profile = {};

	//$scope.searchResults=[];


		GitHubProfileFactory.getUserInfo().then(fulfilled, rejected)
		function fulfilled(profileData) {
					$scope.info = profileData;

			$scope.profile.name = profileData.data.name
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
	


	});