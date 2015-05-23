// app.config(function ($stateProvider) {
//     $stateProvider.state('chart', {
//         url: '/chart/:owner/:name',
//         templateUrl: 'js/chart/chart.html',
//         controller: 'BurndownController'
//     });
// });

// app.controller('BurndownController', function($scope, $stateParams, RepoFactory){
	
// 	// $scope.totalIssues = [];
// 	// $scope.milestoneDates = [];
// 	$scope.burndownData = [
// 		{hour: 1,sales: 54},
//         {hour: 2,sales: 66},
//         {hour: 3,sales: 77},
//         {hour: 4,sales: 70},
//         {hour: 5,sales: 60},
//         {hour: 6,sales: 63},
//         {hour: 7,sales: 55},
//         {hour: 8,sales: 47},
//         {hour: 9,sales: 55},
//         {hour: 10,sales: 30}
// 	];

// 	// $scope.getData = $scope.burndownData.push({hour: hour,
// 	// 	issues: openIssues});

// });

// app.directive('chart', function($window){
// 	return{
// 		restrict:'EA',
// 		template: "<svg width='850' height='200'> </svg>",
// 		link: function(scope, elem, attrs){
// 			var plotData = scope[attrs.chartData];
// 			var padding = 20;
// 			var pathClass = 'path';
// 			var xScale, yScale, xAxisGen, yAxisGen, lineFun;
// 			var d3 = $window.d3;
// 			var rawSvg = elem.find("svg");
// 			var svg = d3.select(rawSvg[0]);

// 			function setChartParameters(){

//                xScale = d3.scale.linear()
//                    .domain([plotData[0].hour, plotData[plotData.length-1].hour])
//                    .range([padding + 5, rawSvg.attr("width") - padding]);

//                yScale = d3.scale.linear()
//                    .domain([0, d3.max(plotData, function (d) {
//                        return d.sales;
//                    })])
//                    .range([rawSvg.attr("height") - padding, 0]);

//                xAxisGen = d3.svg.axis()
//                    .scale(xScale)
//                    .orient("bottom")
//                    .ticks(plotData.length - 1);

//                yAxisGen = d3.svg.axis()
//                    .scale(yScale)
//                    .orient("left")
//                    .ticks(5);

//                lineFun = d3.svg.line()
//                    .x(function (d) {
//                        return xScale(d.hour);
//                    })
//                    .y(function (d) {
//                        return yScale(d.sales);
//                    })
//                    .interpolate("basis");
//            	}
         
//          	function drawLineChart() {

//                setChartParameters();

//                svg.append("svg:g")
//                    .attr("class", "x axis")
//                    .attr("transform", "translate(0,180)")
//                    .call(xAxisGen);

//                svg.append("svg:g")
//                    .attr("class", "y axis")
//                    .attr("transform", "translate(20,0)")
//                    .call(yAxisGen);

//                svg.append("svg:path")
//                    .attr({
//                        d: lineFun(plotData),
//                        "stroke": "blue",
//                        "stroke-width": 2,
//                        "fill": "none",
//                        "class": pathClass
//                    });
//            	}
         
//             drawLineChart();
	    	
// 	    	scope.$watchCollection(exp, function(newVal, oldVal) {
// 				  plotData = newVal;
// 				  redrawLineChart();
// 				});
				 
// 				function redrawLineChart() {
				 
// 				  setChartParameters();
// 				  svg.selectAll("g.y.axis").call(yAxisGen);
// 				  svg.selectAll("g.x.axis").call(xAxisGen);
				 
// 				  svg.selectAll("." + pathClass)
// 				     .attr({
// 				       d: lineFun(plotData)
// 				     });
// 				}
// 	       }
// 		};
// })