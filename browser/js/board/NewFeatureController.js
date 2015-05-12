app.controller('NewFeatureController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newFeature = {
      title: '',
      details: '',
      phases:[
        { name: 'Open',
          cards: []
        },
        { name: 'In progress',
          cards: []
        },
        { name: 'Closed',
          cards: []
        }
      ]
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
          $scope.ok = function(featureTitle){
              console.log('SCOPE.BOARD ', board);
              BoardManipulator.addFeature($scope.board, featureTitle);
              console.log(featureTitle);
              $modalInstance.close();
            };
        }

      });
      $scope.modalFeature.result.then(function (board) {
          $scope.board = board;
      });
    };
});