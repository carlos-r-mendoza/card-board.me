'use strict'
app.directive('mainContent', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        // scope: {},
        templateUrl: 'js/common/directives/main-content/main-content.html'
    };

});