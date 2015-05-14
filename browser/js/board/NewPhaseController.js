app.controller('NewPhaseController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newPhase = {
    name: '',
    cards: []
  };

  $scope.addNewPhase = function(board){
      $scope.modalFeature = $modal.open({
        templateUrl: '/js/board/newPhase.html',
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
          $scope.ok = function(PhaseTitle){
              //BoardManipulator.addFeature($scope.board, featureTitle);
              BoardManipulator.addPhaseToAll($scope.board, PhaseTitle);
              // BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'In progress'});
              // BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'Closed'});
              $modalInstance.close();
            };
        }

      });
      $scope.modalFeature.result.then(function (board) {
          $scope.board = board;
      });
    };
});