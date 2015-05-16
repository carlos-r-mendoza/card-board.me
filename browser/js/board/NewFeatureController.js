app.controller('NewFeatureController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newFeature = {
    title: "",
    color: "",
    due_on: "",
    description: ""
  };
  
  $scope.addNewFeature = function(board){
      $scope.modalFeature = $modal.open({
        templateUrl: '/js/board/newFeature.html',
        backdrop: 'static',
        resolve: {
          sprintBoard: function(){
            return board;
          }
        },
        controller: function($scope, $modalInstance, sprintBoard){
          $scope.board = sprintBoard;
          $scope.close = function(){
            $modalInstance.close();
          };
          $scope.ok = function(featureTitle, featureInfo){
              BoardManipulator.addNewFeature($scope.board, featureInfo);
              BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'Open'}); //NEED TO AUTOMATE BY COULMN NAME
              BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'In progress'});
              BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'Closed'});
              $modalInstance.close();
            };
        }

      });
      $scope.modalFeature.result.then(function (board) {
          $scope.board = board;
      });
    };
});