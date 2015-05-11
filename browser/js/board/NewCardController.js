app.controller('NewCardController', function ($scope, $modal, $modalInstance, BoardService, BoardManipulator, featureName, $rootScope, sprintBoard) {

  $scope.featureName = featureName;

  console.log($scope.featureName);

  $scope.newCard = {
      title: '',
      details: '',
      status: 'Open',
      comments: '',
      assignee: '',
      label: '',
      dueDate: ''
  };

  $scope.close = function () {
    $modalInstance.close();
  };

 $scope.board = sprintBoard;

  $scope.addCard = function(newCard, featureName){ 
    console.log('called');
    BoardManipulator.addCardToFeature($scope.board, featureName, 'Open', newCard);
    console.log('TO ADD TO DB & BOARD');
    $modalInstance.close();
  };

});