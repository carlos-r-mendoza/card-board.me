
app.config(function ($stateProvider) {
    $stateProvider.state('other-cards', {
        url: '/board/:owner/:name/other-cards',
        templateUrl: 'js/other-cards/other-cards.html',
        controller: 'OtherCardsController'
    });
});

app.controller('OtherCardsController', function ($scope, $stateParams, RepoFactory){

	$scope.otherOpenCards = [];
	$scope.otherClosedCards = [];

	RepoFactory.getRepoIssues($stateParams).then(getOtherCards, rejected);

	function getOtherCards(issues) {
		
		issues.data.forEach(function(issue) {
			if(!issue.milestone && !issue.pull_request) {
				if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
				else { $scope.otherClosedCards.push(issue); }
			}
			if(issue.milestone && issue.pull_request) {
				var milestoneName = issue.milestone.title.split(" - ");
				if(milestoneName[0] !== "Feature") {
					console.log("TEST", issue)
					if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
					else { $scope.otherClosedCards.push(issue); }				
				}
			}
		});
	console.log($scope.otherOpenCards.length)	
	console.log($scope.otherClosedCards.length)	
	}
	

	function rejected(error){
	 console.log(error);
	}


});