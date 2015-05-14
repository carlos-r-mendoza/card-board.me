app.controller('EditCardController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams){
	   
	   $scope.editCard = function(board, featureName, cardStatus, card){
	   
        $scope.modalEdit = $modal.open({
        templateUrl: '/js/board/editCard.html',
        backdrop: 'static',
        resolve: {
          sprintBoard: function(){
            return board;
          },
          currentFeature: function(){
            return featureName;
          },
          currentStatus: function(){
            return cardStatus;
          },
          currentCard: function(){
            return card;
          }
        },
        controller: function($scope, $modalInstance, sprintBoard, currentFeature, currentCard, currentStatus){
          
          $scope.board = sprintBoard;
          $scope.close = function(){
            $modalInstance.close();
          };
          $scope.editedCard = {
            title: '',
            details: '',
            status: 'Open',
            comments: '',
            assignee: '',
            label: 'Feature - '+featureName,
            dueDate: ''
           };

          $scope.ok = function(editedCard){
            BoardManipulator.editCard($scope.board, currentFeature, currentStatus, currentCard, editedCard);
            RepoFactory.editRepoIssue($stateParams, editedCard);
            $modalInstance.close();
          };
        }
      });
    };

});