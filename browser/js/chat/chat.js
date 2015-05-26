app.config(function ($stateProvider) {
    $stateProvider.state('chat', {
        url: '/:owner/:name/chat',
        templateUrl: 'js/chat/chat.html',
        controller: 'ChatController'
    });
});

app.controller('ChatController', function($scope, $rootScope){
	$scope.receivedMessage=[];
	

	var socket = io.connect('http://localhost:1337');

	socket.on('connect', function(data){
		var username = $rootScope.user.github.username;
		socket.emit('join', username);
	});

	socket.on('messages', function(data){
		$scope.$apply(function() {
			console.log(data);
			$scope.receivedMessage.push(data);
		});
	});
	
	$scope.sendMessage = function(message) {
		socket.emit('messages', message);
	};
	// socket.on('messages', function (data){
	// 	console.log(data.hello);
	// });

});

