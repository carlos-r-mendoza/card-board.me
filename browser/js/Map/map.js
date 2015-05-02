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
	console.log("Reached Controller");
	//gt
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
  app.controller("BarCtrl", function ($scope) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
});
	
