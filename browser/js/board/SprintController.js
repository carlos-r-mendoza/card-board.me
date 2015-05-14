app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board/:owner/:name',
        templateUrl: 'js/board/board.html',
        controller: 'SprintController'
    });
});

app.controller('SprintController', function ($scope, $stateParams, BoardService, BoardManipulator, $rootScope, RepoFactory) {

  $scope.sprintBoard; 

  $scope.sprintSortOptions = {

    //restrict move across features. move only within feature.
    accept: function (sourceItemHandleScope, destSortableScope, destItemScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$parent.$parent.feature.$$hashKey === destSortableScope.$parent.$parent.feature.$$hashKey;
    },
    itemMoved: function (event) {
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };

  $scope.addNewCard = BoardService.addNewCard;

  $scope.addNewFeature = BoardService.addNewFeature;
  $scope.removeCard=BoardService.removeCard;

  function rejected(error){
    console.log(error);
  }
  



    var sprint={
      "name": "Sprint Board",
      "numberOfColumns": 4,
      "columns": [
        {"name": "Open"},
        {"name": "In Progress"},
        {"name": "Closed"}
      ],
      "features": []
    };

    $scope.sprintBoard = BoardService.sprintBoard(sprint);  

    var featureLabelsArr = [];

    RepoFactory.getRepoLabels($stateParams).then(getLabelFeatures, rejected);

    function getLabelFeatures(repoLabels) {
      // console.log("RE")
      repoLabels.data.forEach(function(label) {
        var featureName = label.name.split(" - ");
              // console.log("HERE", featureSplit);

        if(featureName[0] === "Feature") {
          featureLabelsArr.push(repoLabels);
          populateFeaturesColumn(featureName[1]);
        } else if (featureName[0] === "Phase") {
          createPhaseColumn(featureName[1]);
        }
      });
      // $scope.sprintBoard = BoardService.sprintBoard(sprint);  

      RepoFactory.getRepoIssues($stateParams).then(addIssuesToPhases, rejected);

      $scope.sprintBoard = BoardService.sprintBoard(sprint);  

    } 

    function populateFeaturesColumn(featuresTitle) {
      sprint.features.push(
        {"title": featuresTitle, //label
          "details": "Feature",  //can delete
          "phases": [
            {"name": "Open",
              "cards": []},
            {"name": "In progress",
              "cards": []},
            {"name": "Closed",
              "cards": []}
          ]}
      );
    }

    function createPhaseColumn(phase) {
      console.log("sprintfeatures",sprint.features.phases);
      console.log(phase);
      sprint.columns.push(
        {"name": phase});
      addPhasesToFeatures();
    }

    function addPhasesToFeatures() {
      sprint.columns.forEach(function(column) {
        sprint.features.forEach(function(feature){
          feature.phases.push({"name": column, //Status Open
              "cards": []});
          });
        });
      }
    
    function addIssuesToPhases(repoIssues) {
      repoIssues.data.forEach(function(issue) {
      if(issue.labels.length > 0) {
        // console.log(issue)
      //var labels = issue.labels.sort();
      
        for (var i = 0; i < issue.labels.length-1; i++) {
          sprint.features.forEach(function(feature) {
             //console.log("FEA", feature)
            if(issue.labels[i].name === "Feature - " + feature.title) {
              // console.log(labels);

                feature.phases.forEach(function(phase){
                              // console.log("LABEL", issue.labels[1], issue.title, phase.name.name)

                  issue.labels.forEach(function(label){

                    if(label.name === "Phase - " + phase.name.name) {
                      //console.log("AT PHASE",phase);
                    
                      phase.cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"});
                      console.log(phase.name);

                    }
            //         $scope.sprintBoard = BoardService.sprintBoard(sprint);  



                  });

                });
   
            }
          });
        }


    }

    });
    $scope.sprintBoard = BoardService.sprintBoard(sprint); 
  } 

});