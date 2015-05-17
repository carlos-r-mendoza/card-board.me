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
            title: currentCard.title,
            details: currentCard.details,
            state: currentCard.state,
            number: currentCard.number,
            feature: currentCard.feature,
            phase: currentCard.phase,
            labels: [],
            assignee: currentCard.assignee.login,
            comments: currentCard.comments,
            milesone: currentCard.milesone,
            dueDate: currentCard.dueDate
          };

          function err(error){
            console.log(error);
          }

          var filterIssue = function(editedCard){
              $scope.editedIssue = {
                title: editedCard.title
              };

              if(editedCard.details){
                $scope.editedIssue.body = editedCard.details;
              }

              if(editedCard.assignee){
                $scope.editedIssue.assignee = editedCard.assignee;
              }
                // RepoFactory.createLabels;//EDIT THIS
              $scope.editedIssue.labels=['Feature - '+featureName];
              
              return $scope.editedIssue;
            };

          console.log('currentCARD', currentCard);

          
          RepoFactory.getRepoCollaborators($stateParams).then(function(info){
            $scope.collaborators = info.data;
          }, err);

          

          $scope.ok = function(editedCard){

            filterIssue(editedCard);
        
            // console.log('EDITED ISSUE: ', $scope.editedIssue); 
            // console.log('NUMBER', currentCard.number);

            BoardManipulator.editCard($scope.board, currentFeature, currentStatus, currentCard, editedCard);
            RepoFactory.editRepoIssue($stateParams, currentCard.number, $scope.editedIssue);
            $modalInstance.close();
          };
      }
    });
};
});