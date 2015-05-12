'use strict';

app.directive('mainContent', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        // scope: {},
        templateUrl: 'js/navbar/navbar.html',
        controller: 'NavbarController'
    };

});

app.controller('NavbarController', function($scope){

  // More information: http://materializecss.com/side-nav.html

   $('.button-collapse').sideNav({
	menuWidth: 450, // Default is 240
	edge: 'left', // Choose the horizontal origin
	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

 });