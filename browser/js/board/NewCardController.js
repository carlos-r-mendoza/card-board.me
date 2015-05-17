app.controller('NewCardController', function ($scope, $modal, $modalInstance, BoardService, BoardManipulator, RepoFactory, featureName, featureInfo, $rootScope, $stateParams, sprintBoard, BoardModel) {
  $scope.featureName = featureName;

  $scope.newCard = {
      title: '',
      details: '',
      state: 'open',
      feature: featureName,
      phase: 'Open',
      labels: [],
      assignee: '',
      milestone: featureInfo.number 
  };


  $scope.close = function () {
    $modalInstance.close();
  };

 $scope.board = sprintBoard;

 function rejected(error){
  console.log(error);
 }

 RepoFactory.getRepoCollaborators($stateParams).then(function(info){
            $scope.collaborators = info.data;
          }, rejected);

  var taskInfo = function(newCard) {
    $scope.newIssue={
      title: newCard.title
    };
    if(newCard.details){
      $scope.newIssue.body = newCard.details;
    }
    if(newCard.assignee){
      $scope.newIssue.assignee = newCard.assignee;
    }
    $scope.newIssue.state = 'open';
    $scope.newIssue.milestone = newCard.milestone;
    $scope.newIssue.labels = ['Feature - '+ featureName];
    if((newCard.labels).length > 0){
      ($scope.newIssue.labels).push(newCard.labels);
    }  
  };

  $scope.addCard = function(newCard, featureName){ 

    console.log(newCard);
    
    taskInfo(newCard);
    
    BoardManipulator.addCardToFeature($scope.board, featureName, 'Open', newCard);
    RepoFactory.createRepoIssue($stateParams, $scope.newIssue);
    $modalInstance.close();
  };

});