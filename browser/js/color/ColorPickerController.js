app.controller('ColorPicker', function($scope, $stateParams){
	$scope.colors = [
		{name: 'black',
		 hex: '000000'},
		{name: 'grey',
		 hex: '9e9e9e'},
		{name: 'white',
	 	 hex: 'FFFFFF'},
	 	{name: 'red',
	 	 hex: 'c62828'},
	 	{name: 'orange',
	 	 hex: 'ff9800'},
	 	{name: 'yellow',
	 	 hex: 'ffd600'},
	 	{name: 'green',
	 	 hex: '4caf50'},
	 	{name: 'blue',
	 	 hex: '2196f3'},
	 	{name: 'purple',
	 	 hex: '7e57c2'}
	];

});