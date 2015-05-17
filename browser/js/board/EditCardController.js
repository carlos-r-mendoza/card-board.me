app.controller('EditCardController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams){
	   
	   $scope.editCard = function(board, featureName, cardStatus, card){
      
      console.log('CARD: ', card);

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
            assignee: '',
            comments: currentCard.comments,
            milesone: currentCard.milesone,
            dueDate: currentCard.dueDate
          };

          if(currentCard.assignee){
            $scope.editedCard.assignee = currentCard.assignee.login;
          }

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
              $scope.editedIssue.labels=['Feature - '+featureName];
              
              if(($scope.labels).length>0){
                var issueLabels = $scope.editedIssue.labels;
                var newLabels = $scope.labels;
                $scope.editedIssue.labels = issueLabels.concat(newLabels);
              }
              return $scope.editedIssue;
            };

          
          RepoFactory.getRepoCollaborators($stateParams).then(function(info){
            $scope.collaborators = info.data;
          }, err);

          $scope.labels = [];

          $scope.addLabel = function(label){
            $scope.label = {
              name: label.name,
              color: label.color
            };
            $scope.labels.push($scope.label.name);
            
            RepoFactory.createRepoLabel($stateParams, $scope.label);
           
          };

          RepoFactory.getRepoLabels($stateParams).then(function(info){
            $scope.listLabels = (info.data).filter(function(el){
              var name = el.name;
              if(name.indexOf('Feature - ')!==0 && name.indexOf('Phase - ')!==0){
                return true;
              }
            });
          }, err);


          $scope.addLabelToIssue = function(label){
            $scope.labels.push(label);
          };

          $scope.ok = function(editedCard){

            filterIssue(editedCard);
            // console.log($scope.editedIssue);
            BoardManipulator.editCard($scope.board, currentFeature, currentStatus, currentCard, editedCard);
            RepoFactory.editRepoIssue($stateParams, currentCard.number, $scope.editedIssue);
            $modalInstance.close();
          };
      }
    });
};
});