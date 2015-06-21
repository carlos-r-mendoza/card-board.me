app.controller('EditFeatureController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams, ProgressFactory){
	   
	   $scope.editFeature = function(board, currentFeature){
	     console.log("CF", currentFeature);
        $scope.modalEdit = $modal.open({
        templateUrl: '/js/features/editFeature.html',
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
          $scope.board = sprintBoard;
          //console.log("CF",currentFeature);
          currentFeature.due_date=new Date (currentFeature.due_date);
          $scope.editedFeature={
            title: currentFeature.title,
            description: currentFeature.description,
            dueDate: currentFeature.due_date,
            number: currentFeature.number
          };
          //console.log("EF", $scope.editFeature);
          $scope.close = function(){
            $modalInstance.close();
          };

          $scope.ok = function(editedFeature){
            console.log("EF",$scope.editedFeature);
            console.log("CF",currentFeature);
            $scope.editedFeature.title = "Feature - "+$scope.editedFeature.title;
            RepoFactory.updateRepoMilestone($stateParams,$scope.editedFeature);
            RepoFactory.deleteRepoLabel($stateParams,{name:"Feature - "+currentFeature.name});
            RepoFactory.createRepoLabel($stateParams, $scope.editedFeature);
            //TODO: Remove old label, add new one
            console.log(board);
            board.features.forEach(function(feature){
              //console.log("FN",feature.name);
              //console.log("CFI",currentFeature);
              //console.log("EF", $scope.editedFeature.title.split(" - ")[1]);
              // if (feature.name===currentFeature.name){
              //   console.log("before", feature);
              //   feature.title=$scope.editedFeature.title.split(" - ")[1];
              //   feature.due_on=$scope.editedFeature.dueDate;
              //   feature.description=$scope.editedFeature.description;
              //   feature.phases.forEach(function(phase){
              //     phase.cards.forEach(function(card){
              //       //console.log("before", card)
              //       card.feature=$scope.editedFeature.title.split(" - ")[1];
              //       console.log("CL",card.labels);
              //       card.labels.forEach(function(label){
              //         console.log("label",label);
              //         if (label.name.split(" - ")[0]==="Feature"){
              //           console.log("label",label);
              //           //RepoFactory.editRepoLabel($stateParams,label.name,{name:$scope.editedFeature.title});
              //           //RepoFactory.deleteRepoLabel($stateParams,{name:label.name});
              //           label.name=$scope.editedFeature.title;
              //           //RepoFactory.createRepoLabel($stateParams,{name:label.name, color:$scope.editedFeature.color});
              //           //RepoFactory.editRepoLabel($stateParams,)
              //         }

              //       })


              //     })
              //   })
              // }
            }) 
            //$scope.newFeatureTitle = editFeature.title;
            //$scope.oldLabel = 'Feature - '+currentFeature;

            //BoardManipulator.editFeature($scope.board, currentFeature, $scope.newFeatureTitle);
            //RepoFactory.editRepoLabel($stateParams, $scope.oldLabel, $scope.editedFeature);
            $modalInstance.close();
          };
        }
      });
    };

    $scope.removeFeature = function(feature, board) {
      BoardManipulator.removeFeature(feature, board);
    };

});