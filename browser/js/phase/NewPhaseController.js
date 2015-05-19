app.controller('NewPhaseController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newPhase = {
    name: '',
    cards: []
  };
  $scope.columnshow=false;

  // $scope.columnshow=function(column){
  //   var colarray=["Open","Closed","In Progress"];
  //   console.log(column.name);
  //   if (colarray.indexOf(column.name)<0){
  //     return ;
  //   }
  // }
  //$scope.columnshow(column);


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
    $scope.deletePhase=function(phase, sprintBoard){
      //console.log(phaseName);
      //console.log(sprintBoard);
      BoardManipulator.removePhase(sprintBoard,phase)
    }
});