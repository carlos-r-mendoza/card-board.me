'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/map/map.html',
        controller: 'SearchController'
    });
});

app.factory('SearchFactory', function($http){
	return {
		getSearchResults: function (query, language){
			return $http.get('/github/'+query+'/'+language).then(function(results){
				return results;
			});
		}
	};

});

app.controller('SearchController', function($scope, SearchFactory) {
	$scope.search={};
	$scope.search.text="";
	$scope.search.language="";
	//$scope.searchResults=[];
	$scope.setSearch=function(text, language){
		console.log("insidesetSearch");
		SearchFactory.getSearchResults(text,language).then(fulfilled,rejected);
		function fulfilled(results){
			$scope.searchResults=results.data.items;
		}
		function rejected(error){
			console.log(error);
		}
	};

});