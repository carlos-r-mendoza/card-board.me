'use strict';
var app = angular.module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'chart.js']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });


});
// app.run(function () {
//     angular.element(document).ready(function(){
//         google.load('visualization', '1.0', {'packages':['corechart'],'callback':'alert("hello")'});
    
//       // Set a callback to run when the Google Visualization API is loaded.
//       google.setOnLoadCallback(drawChart);

//       // Callback that creates and populates a data table,
//       // instantiates the pie chart, passes in the data and
//       // draws it.
//       function drawChart() {

//         console.log('horray');

//         // Create the data table.
//         var data = new google.visualization.DataTable();
//         data.addColumn('string', 'Topping');
//         data.addColumn('number', 'Slices');
//         data.addRows([
//           ['Mushrooms', 3],
//           ['Onions', 1],
//           ['Olives', 1],
//           ['Zucchini', 1],
//           ['Pepperoni', 2]
//         ]);

//         // Set chart options
//         var options = {'title':'How Much Pizza I Ate Last Night',
//                        'width':400,
//                        'height':300};
//         var diva=document.getElementById('chart_div');
//         console.log(diva);
//         // Instantiate and draw our chart, passing in some options.
//         var chart = new google.visualization.PieChart(diva);
//         chart.draw(data, options);
//       }
//       })
// })