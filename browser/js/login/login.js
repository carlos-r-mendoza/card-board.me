

app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
});

// function a() = {
// app.directive('backImg', function(){
//     return function(scope, element, attrs){
//         var url = attrs.backImg;
//         element.css({
//             'background-image': 'url(' + url +')',
//             'background-size' : 'cover'
//         });
//     }
// });​
// }

app.controller('LoginCtrl', function ($scope, $rootScope, AuthService, $state) {



    $scope.login = {};
    $scope.error = null;
    $rootScope.repoName = ""; //hides navbar repo links 


    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});

