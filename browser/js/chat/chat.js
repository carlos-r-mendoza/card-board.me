// app.directive('chat', function() {

//     return {
//         restrict: 'E',
//         templateUrl: 'js/chat/chat.html',
//         controller: 'ChatController'
//     };

// });

// app.controller('ChatController', function($scope, $rootScope){
// 	$scope.receivedMessages=[];
// 	console.log($rootScope);
// 	var avatar = "";

// 	var socket = io.connect('http://localhost:1337');

// 	socket.on('connect', function(data){
// 	    var username = $rootScope.user.github.username;
// 		avatar = $rootScope.user.github.avatar;
// 		socket.emit('join', username, avatar);
// 	});

// 	socket.on('messages', function(data){
// 		$scope.$apply(function() {
// 			console.log(data);
// 			$scope.receivedMessages.push(data);
// 			$scope.avatar = avatar;
// 			$scope.message = "";
// 		});
// 	});
	
// 	$scope.sendMessage = function(message) {
// 		socket.emit('messages', message);
// 	};
// });

