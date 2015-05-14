app.controller('NewCardController', function ($scope, $modal, $modalInstance, BoardService, BoardManipulator, RepoFactory, featureName, $rootScope, $stateParams, sprintBoard) {

  $scope.featureName = featureName;

  $scope.newCard = {
      title: '',
      details: '',
      status: 'Open',
      comments: '',
      assignee: '',
      label: 'Feature - '+featureName,
      dueDate: ''
  };

  $scope.close = function () {
    $modalInstance.close();
  };

 $scope.board = sprintBoard;

 function rejected(error){
  console.log(error);
 }

  $scope.addCard = function(newCard, featureName){ 
    
    var taskInfo = {
                user: $stateParams.owner,
                repo: $stateParams.name,
                title: newCard.title, 
                body: newCard.details, 
                assignee: newCard.assignee, 
                // milestone:1,
                labels: [newCard.label]
              };
    //taskInfo.push("Feature - Testing");
    BoardManipulator.addCardToFeature($scope.board, featureName, 'Open', newCard);
    RepoFactory.createRepoIssue($stateParams, taskInfo);
    $modalInstance.close();
  };

});