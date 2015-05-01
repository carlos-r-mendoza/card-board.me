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
	// //Load the Visualization API and the piechart package.
 //      google.load('visualization', '1.0', {'packages':['corechart']});

 //      // Set a callback to run when the Google Visualization API is loaded.
 //      google.setOnLoadCallback(drawChart);

 //      // Callback that creates and populates a data table,
 //      // instantiates the pie chart, passes in the data and
 //      // draws it.
 //      function drawChart() {

 //        // Create the data table.
 //        var data = new google.visualization.DataTable();
 //        data.addColumn('string', 'Topping');
 //        data.addColumn('number', 'Slices');
 //        data.addRows([
 //          ['Mushrooms', 3],
 //          ['Onions', 1],
 //          ['Olives', 1],
 //          ['Zucchini', 1],
 //          ['Pepperoni', 2]
 //        ]);

 //        // Set chart options
 //        var options = {'title':'How Much Pizza I Ate Last Night',
 //                       'width':400,
 //                       'height':300};

 //        // Instantiate and draw our chart, passing in some options.
 //        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
 //        chart.draw(data, options);
 //      }


});