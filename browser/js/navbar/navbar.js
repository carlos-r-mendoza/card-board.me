'use strict';

app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        // scope: {},
        templateUrl: 'js/navbar/navbar.html',
        controller: 'NavbarController'
    };

});

app.controller('NavbarController', function($scope,$rootScope, AuthService, AUTH_EVENTS, $state){

  // More information: http://materializecss.com/side-nav.html
  $scope.user = null;

  $scope.isLoggedIn = function () {
      return AuthService.isAuthenticated();
  };

  $scope.logout = function () {
      AuthService.logout().then(function () {
         $state.go('home');
      });
  };

  var setUser = function () {
      AuthService.getLoggedInUser().then(function (user) {
          $scope.user = user;
      });
  };

  var removeUser = function () {
      $scope.user = null;
  };

  setUser();

  $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
  $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
  $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
   $('.button-collapse').sideNav({
	menuWidth: 450, // Default is 240
	edge: 'left', // Choose the horizontal origin
	closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

 });