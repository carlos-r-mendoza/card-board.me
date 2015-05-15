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

          RepoFactory.getRepoIssues($stateParams).then(function(repoIssues, err){
            if(err)console.log(err);
             $scope.repoInfo = repoIssues.data;
             return $scope.repoInfo;
          });

          //TO DO !!!
          $scope.getRepoNum = function(repoInfo, currentCard){ //NEED TO GET REPO ISSUE AND FIND MATCHING NUMBER TO BE ABLE TO UPDATE THE ISSUE IN GITHUB
            console.log('TITLE:', repoInfo);
            console.log('CARD:', currentCard);
            
            // repoInfo.forEach(repoInfo, function(info){
            //   if(info.title === currentCard.title){
            //     console.log('NUMBER:', info.number);
            //     return info.number;
            //   }
            // });
          }

          $scope.getRepoNum($scope.repoInfo, currentCard);

          console.log('currentCARD', currentCard);

          $scope.ok = function(editedCard){  
            BoardManipulator.editCard($scope.board, currentFeature, currentStatus, currentCard, editedCard);
            RepoFactory.editRepoIssue($stateParams, editedCard);
            $modalInstance.close();
          };
        }
      });
    };

});