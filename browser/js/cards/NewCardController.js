app.controller('NewCardController', function ($scope, $modal, $modalInstance, BoardService, BoardManipulator, RepoFactory, featureName, featureInfo, $rootScope, $stateParams, sprintBoard, BoardModel, ProgressFactory) {
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
    if(($scope.labels).length > 0){
      var issueLabels = $scope.newIssue.labels;
      var newLabels = $scope.labels;
      $scope.newIssue.labels = issueLabels.concat(newLabels);
    }
    return $scope.newIssue;  
  };

  $scope.labels = [];

  $scope.addLabel = function(label){
    $scope.label = {
      name: label.name,
      color: label.color
    };
    $scope.labels.push($scope.label.name);
    
    RepoFactory.createRepoLabel($stateParams, $scope.label);
   
  };

  RepoFactory.getRepoLabels($stateParams).then(function(info){
    $scope.listLabels = (info.data).filter(function(el){
      var name = el.name;
      if(name.indexOf('Feature - ')!==0 && name.indexOf('Phase - ')!==0){
        return true;
      }
    });
  }, rejected);


  $scope.addLabelToIssue = function(label){
    $scope.labels.push(label);
  };

  $scope.addCard = function(newCard, featureName, board){ 

    console.log(newCard);
        
    taskInfo(newCard);
    RepoFactory.createRepoIssue($stateParams, $scope.newIssue).then(function(createdIssue){
          BoardManipulator.addCardToFeature($scope.board, featureName, 'Open', createdIssue.data);
    });
    $modalInstance.close();
    ProgressFactory.updateBar(board);
  };

});