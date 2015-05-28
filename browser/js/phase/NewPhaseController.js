app.controller('NewPhaseController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newPhase = {
    name: '',
    cards: []
  };
  $scope.columnshow=false;

  $scope.addNewPhase = function(board){
      $scope.modalFeature = $modal.open({
        templateUrl: '/js/phase/newPhase.html',
        backdrop: 'static',
        size: 'sm',
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
              BoardManipulator.addPhaseToAll($scope.board, PhaseTitle);
              $modalInstance.close();
            };
        }

      });
      $scope.modalFeature.result.then(function (board) {
          $scope.board = board;
      });
    };
    $scope.deletePhase=function(phase, sprintBoard){
      BoardManipulator.removePhase(sprintBoard,phase);
    };
});