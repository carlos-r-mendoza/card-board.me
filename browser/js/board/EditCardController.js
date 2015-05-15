app.controller('EditCardController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams){
	   
	   $scope.editCard = function(board, featureName, cardStatus, card){
      console.log("CARD", card);
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
            phase: currentCard.phase,
            comments: currentCard.comments,
            assignee: currentCard.assignee,
            labels: ['Feature - '+featureName],
            dueDate: currentCard.dueDate,
            number: currentCard.number,
            feature: currentCard.feature
           };


           function err(error){
            console.log(error);
          }

          function editIssue(info){
            var issues = info.data;
            // console.log('ISSUE info', info.data);
            // console.log('ISSUES: ', issues);
            issues.filter(function(issue){
              // console.log('ELEMENT: ', issue);
              // console.log('TITLE:' , issue.title);
              // console.log('CARD TITLE: ', currentCard.title);
              
              if(issue.title === currentCard.title){
                console.log('NUMBER: ', issue.number);
                $scope.issueNum = issue.number;
                // RepoFactory.editRepoIssue($stateParams, $scope.issueNum, editedCard);
                // $modalInstance.close();
              }
            });
          }
            // console.log('SCOPEREPO!!:', $scope.repoIssues);
           
          //TO DO !!!
          // $scope.getRepoNum = function(currentCard){ //NEED TO GET REPO ISSUE AND FIND MATCHING NUMBER TO BE ABLE TO UPDATE THE ISSUE IN GITHUB
          //   RepoFactory.getRepoIssues($stateParams).then(response, err);
          // };

          // $scope.getRepoNum(currentCard);

          console.log('currentCARD', currentCard);

          $scope.ok = function(editedCard){
            
            $scope.editedIssue = {
                title: editedCard.title,
                labels: [editedCard.labels]
              };

            var filterIssue = function(){
              
              if(editedCard.details){
                $scope.editedIssue.body = editedCard.details;
              }
              if(editedCard.assignee){
                $scope.editedIssue.assignee = editedCard.assignee;
              }
              if(editedCard.state){
                $scope.editedIssue.state = editedCard.state;
              }
            };
              
          console.log('EDITED ISSUE: ', $scope.editedIssue); 

            BoardManipulator.editCard($scope.board, currentFeature, currentStatus, currentCard, editedCard);
            RepoFactory.getRepoIssues($stateParams).then(editIssue, err).then(RepoFactory.editRepoIssue($stateParams, $scope.issueNum, $scope.editedIssue));
            $modalInstance.close();
          };
        }
      });
    };

});