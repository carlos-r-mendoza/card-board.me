app.controller('NewFeatureController', function ($scope, $modal, BoardService, BoardManipulator, $rootScope) {

  $scope.newFeature = {
      title: '',
      details: '',
      phases:[
        { name: 'Open',
          cards: [{
            title: 'Add new card',
            details: '',
            status: 'Open',
            assignee: '',
            label: '',
            dueDate: ''
          }]
        },
        { name: 'In progress',
          cards: [{
            title: '',
            details: '',
            status: 'Open',
            assignee: '',
            label: '',
            dueDate: ''
          }]
        },
        { name: 'Closed',
          cards: [{
            title: '',
            details: '',
            status: 'Open',
            assignee: '',
            label: '',
            dueDate: ''
          }]
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
          $scope.ok = function(featureTitle, featureDetails){
              BoardManipulator.addFeature($scope.board, featureTitle);
              BoardManipulator.addPhaseToFeature($scope.board, featureTitle, {name: 'Open'});
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