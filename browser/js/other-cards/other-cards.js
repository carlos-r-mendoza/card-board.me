
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
	$scope.repoFeatures = [];
	$scope.showFeatures = false;
	$scope.showDetails = false;

	$scope.assignCardFeature = function(card) {
		console.log("CARDDDDD", card);
	}


	RepoFactory.getRepoMilestones($stateParams).then(setCardsOptions, rejected);

	function setCardsOptions(milestones) {
		milestones.data.forEach(function(milestone) {
			var featureMilestone = milestone.title.split(" - ");
			if(featureMilestone[0] === "Feature") {
				$scope.repoFeatures.push({ title: featureMilestone[1], number: milestone.number});
			}
		});
		RepoFactory.getRepoIssues($stateParams).then(getOtherCards, rejected);
	}

	function getOtherCards(issues) {	
		issues.data.forEach(function(issue) {
			if(!issue.milestone && !issue.pull_request) {
				if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
				else { $scope.otherClosedCards.push(issue); }
			}
			if(issue.milestone && issue.pull_request) {
				var milestoneName = issue.milestone.title.split(" - ");
				if(milestoneName[0] !== "Feature") {
					if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
					else { $scope.otherClosedCards.push(issue); }				
				}
			}
		});

	}
	
	function rejected(error){
	 console.log(error);
	}

});