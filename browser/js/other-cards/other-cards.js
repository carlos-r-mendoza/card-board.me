'use strict';

app.config(function ($stateProvider) {
    $stateProvider.state('other-cards', {
        url: '/:owner/:name/other-cards',
        templateUrl: 'js/other-cards/other-cards.html',
        controller: 'OtherCardsController'
    });
});

app.controller('OtherCardsController', function ($scope, $rootScope, $stateParams, RepoFactory) {
	
	$scope.$parent.tabs[3].ifSelected = "tab-active"; //sets nav tab active on refresh
	var otherCardsCount = 0;	

	$rootScope.repoName = $stateParams.name; //gives navbar.html access to project name
	$rootScope.repoOwner = $stateParams.owner; //gives navbar.html access to project owner
  	$rootScope.otherCardsCount = 0;
	$scope.spinner = true;
	$scope.otherOpenCards = [];
	$scope.otherClosedCards = [];
	$scope.repoFeatures = [];
	$scope.showOpenCardFeatures = [];
	$scope.showOpenCardDetails = [];
	$scope.openCardFeatureAssigned = [];
	$scope.openCardTitle = [];
	$scope.openCardFeature = [];
	$scope.showClosedCardFeatures = [];
	$scope.showClosedCardDetails = [];
	$scope.closedCardFeatureAssigned = [];
	$scope.closedCardTitle = [];
	$scope.closedCardFeature = [];

	$scope.toggleOpenCardFeatures = function(indx) {
		$scope.showOpenCardFeatures[indx] = !$scope.showOpenCardFeatures[indx];
		$scope.showOpenCardDetails[indx] = false;
	};

	$scope.toggleOpenCardDetails = function(indx) {
		$scope.showOpenCardDetails[indx] = !$scope.showOpenCardDetails[indx];
		$scope.showOpenCardFeatures[indx] = false;
	};

	$scope.toggleClosedCardFeatures = function(indx) {
		$scope.showClosedCardFeatures[indx] = !$scope.showClosedCardFeatures[indx];
		$scope.showClosedCardDetails[indx] = false;
	};

	$scope.toggleClosedCardDetails = function(indx) {
		$scope.showClosedCardDetails[indx] = !$scope.showClosedCardDetails[indx];
		$scope.showClosedCardFeatures[indx] = false;
	};

	$scope.assignCardAFeature = function(card, indx) {
		var cardClosed;
		
		if(card.state === "closed") { 
			cardClosed = true; 
			card.state = "open"; }

		if(card.feature){
		var featureInfo = JSON.parse(card.feature);
		card.milestone = featureInfo.number;
		card.labels.push("Feature - " + featureInfo.title);

			RepoFactory.editRepoIssue($stateParams, card.number, card).then(function(updatedCard){
				if(cardClosed) { 
					$scope.closedCardFeatureAssigned[indx] = true; 
					$scope.closedCardTitle[indx] = card.title;
					$scope.closedCardFeature[indx] = featureInfo.title;
				} else { 
					$scope.openCardFeatureAssigned[indx] = true; 
					$scope. openCardTitle[indx] = card.title;
					$scope.openCardFeature[indx] = featureInfo.title;
				}
		});}
	};

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
				otherCardsCount++;
				if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
				else { $scope.otherClosedCards.push(issue); }
			} else if(issue.milestone && !issue.pull_request) {
				var milestoneName = issue.milestone.title.split(" - ");
				if(milestoneName[0] !== "Feature") {
					otherCardsCount++;
					if(issue.state === "open") { $scope.otherOpenCards.push(issue); } 
					else { $scope.otherClosedCards.push(issue); }				
				}
			}
		});
		$scope.spinner = false;
  		$rootScope.otherCardsCount = otherCardsCount;
	}
	
	function rejected(error){
	 console.log(error);
	}

});