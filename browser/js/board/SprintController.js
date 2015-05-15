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
  $scope.removeCard = BoardService.removeCard;

  function rejected(error){
    console.log(error);
  }
  



    var sprint={
      "name": "Sprint Board",
      "numberOfColumns": 3, //change this number to match number of hardcoded columns 
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
        var labelName = label.name.split(" - ");
              // console.log("HERE", featureSplit);

        if(labelName[0] === "Feature" && labelName[1]) {
          featureLabelsArr.push(repoLabels);
          populateFeaturesColumn(labelName[1]);
          //console.log(sprint)
        } else if (labelName[0] === "Phase" && labelName[1] !== "In Progress") {
          createPhaseColumn(labelName[1]);
        }
      });
      // $scope.sprintBoard = BoardService.sprintBoard(sprint);  
      addPhasesToFeatures();

      RepoFactory.getRepoIssues($stateParams).then(addIssuesToPhases, rejected);

      $scope.sprintBoard = BoardService.sprintBoard(sprint);  

    } 

    function populateFeaturesColumn(featuresTitle) {
      sprint.features.push(
        {"title": featuresTitle, //rows
          "details": "Feature",  //can delete
          "phases": [
            {"name": "Open", //colums
              "cards": []},
            {"name": "In Progress",
              "cards": []},
            {"name": "Closed",
              "cards": []}
          ]}
      );
    }

    function createPhaseColumn(phase) {
      // console.log("sprintfeatures",sprint.features.phases);
      // console.log("AGFD", phase);
      sprint.columns.push(
        {"name": phase});
    }

    function addPhasesToFeatures() {
      for (var i = sprint.numberOfColumns; i <= sprint.columns.length-1; i++) { //2, 4
        sprint.features.forEach(function(feature){
          feature.phases.push({"name": sprint.columns[i].name, //Status Open
              "cards": []});
          });
         }
      }
    
    function addIssuesToPhases(repoIssues) {
      //sconsole.log("SSS",sprint)
      repoIssues.data.forEach(function(issue) {
      if(issue.labels.length > 0) {
        issue.labels.sort();
        // console.log(issue)
      //var labels = issue.labels.sort();
      
        for (var i = 0; i <= issue.labels.length-1; i++) {
          sprint.features.forEach(function(feature) {
             //console.log("FEA", feature)
            if(issue.labels[i].name === "Feature - " + feature.title) {
              // console.log(labels);

                for (var j = sprint.numberOfColumns; j <= feature.phases.length-1; j++) {
                              // console.log("LABEL", issue.labels[1], issue.title, phase.name.name)
                              //console.log("FEa", feature.phases)
                  //issue.labels.forEach(function(label){
                    //console.log("LLL", label,  feature.phases[3].name)

                    // if(label.name === "Phase - " + feature.phase[i].name) {
                    //   console.log("AT PHASE");
                    
                    //   feature.phase.cards.push({"title": issue.title, //issue name
                    //   "details": "Testing Card Details", //issue body
                    //   "status": "Open"});
                    //   console.log(phase.name);

                    // }
            //         $scope.sprintBoard = BoardService.sprintBoard(sprint);                 

                  // for (var k = 0; k < feature.phases.length-1; k++) {
                  for (var k = i; k <= issue.labels.length-1; k++) {
                    if(issue.labels[k].name === "Phase - " + "In Progress") {
                      //console.log("AT PHASE",phase);
                    
                     feature.phases[1].cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"});
                      //console.log(phase.name);
                      break;
                    }
                    if(issue.labels[k].name === "Phase - " + feature.phases[j].name) {
                      //console.log("AT PHASE",phase);
                    
                     feature.phases[j].cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"});
                      //console.log(phase.name);
                      break;
                    }
                    if(k === issue.labels.length-1) {
                      if(issue.state === "open") {
                        console.log("AF", issue)
                       feature.phases[0].cards.push({"title": issue.title, //issue name
                        "details": "Testing Card Details", //issue body
                        "status": "Open"});
                      }

                    }
                    if(k === issue.labels.length-1) {
                      if(issue.state === "closed") {
                        console.log("AF", issue)
                       feature.phases[2].cards.push({"title": issue.title, //issue name
                        "details": "Testing Card Details", //issue body
                        "status": "Open"});
                      }

                    }

                  }  
                  break;
                  // }
               //});
              }
      
   
            }
          });
        }


    }

    });
    $scope.sprintBoard = BoardService.sprintBoard(sprint); 
  } 

});