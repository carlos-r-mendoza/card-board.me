app.controller('EditFeatureController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams){
	   
	   $scope.editingFeature = function(board, currentFeature){
	   
        $scope.modalEdit = $modal.open({
        templateUrl: '/js/board/editFeature.html',
        backdrop: 'static',
        resolve: {
          sprintBoard: function(){
            return board;
          },
          currentFeature: function(){
            return currentFeature;
          }
        },
        controller: function($scope, $modalInstance, sprintBoard, currentFeature, $stateParams){
          console.log('current feature: ', currentFeature);
          $scope.board = sprintBoard;
          $scope.close = function(){
            $modalInstance.close();
          };

          $scope.ok = function(editFeature){
            $scope.editedFeature = {
                name: 'Feature - '+editFeature.title,
                color: 'FFFFFF',
                old: 'Feature - '+currentFeature
              };

            $scope.newFeatureTitle = editFeature.title;
            $scope.oldLabel = 'Feature - '+currentFeature;

            BoardManipulator.editFeature($scope.board, currentFeature, $scope.newFeatureTitle);
            console.log('currentlabel: ', $scope.oldLabel);
            RepoFactory.editRepoLabel($stateParams, $scope.oldLabel, $scope.editedFeature);
            $modalInstance.close();
          };
        }
      });
    };

});