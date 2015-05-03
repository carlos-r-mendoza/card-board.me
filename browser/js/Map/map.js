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
app.factory('DataShare', function () {
    return {};
});

app.controller('SearchController', function($scope, SearchFactory, DataShare) {
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
      DataShare.labels=[]
      DataShare.data=[[]];
      for (var i=0;i<5;i++){
        DataShare.labels.push($scope.searchResults[i].name);
        DataShare.data[0].push($scope.searchResults[i].stargazers_count);
      }
     //console.log("DATASHARE", DataShare);
      //DataShare.labels=[$scope.searchResults[0].name];
      //DataShare.data=[[$scope.searchResults[0].stargazers_count]];
      console.log("Yeehaw", DataShare.labels, DataShare.data);
      //$scope.$digest();
		}
		function rejected(error){
			console.log(error);
		}


	};
});
  app.controller("BarCtrl", function ($scope, DataShare) {
  //$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  //$scope.series = ['Series A'];

  //$scope.data = [
     //[65, 59, 80, 81, 56, 55, 75]];
     //console.log("DATASHARE", DataShare);

     // $scope.myclick=function(points, event){
     //    console.log(points);
     //    console.log(event);
     // };
     $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.dataShare = DataShare
  //$scope.$digest();
});
	
