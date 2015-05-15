app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board/:owner/:name',
        templateUrl: 'js/board/board.html',
        controller: 'SprintController'
    });
});

app.controller('SprintController', function ($scope, $stateParams, BoardService, BoardManipulator, $rootScope, RepoFactory) {

  //$scope.sprintBoard = ""; 

  $scope.isCollapsed = false;

  // $scope.collapse = function(isCollapsed, feature){
  //   $scope.collapsed = !(isCollapsed);
  //   return !$scope.collapsed;
  //   console.log(!$scope.collapsed);
    
  //   $scope.collapseFeature = feature;
  // };

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
  



    var sprint= { //board data structure
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

    console.log("FADS", $scope.sprintBoard)

    RepoFactory.getRepoLabels($stateParams).then(getLabelFeatures, rejected);

    function getLabelFeatures(repoLabels) {
      repoLabels.data.forEach(function(label) {
        var labelName = label.name.split(" - ");
         if(labelName[0] === "Feature") {
          populateFeaturesColumn(labelName[1]);
        }  
        if (labelName[0] === "Phase" && labelName[1] !== "In Progress") {
          createPhaseColumn(labelName[1]);
        }
      });
      addPhasesToFeatures();
      RepoFactory.getRepoIssues($stateParams).then(addIssuesToPhases, rejected);
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
      for (var i = 0; i <= sprint.features.length-1; i++) {
        var feature = sprint.features[i];
        var phases = feature.phases; //a feature's phase

          for (var k = 0; k <= repoIssues.data.length-1; k++) {
            var issue = repoIssues.data[k]; //an issue
            issue.labels.sort();

              for (var l = 0; l <= issue.labels.length-1; l++) {
                var label = issue.labels[l]; //a label

                if(label.name === "Feature - " + feature.title) {
                  issue.feature = feature.title;

                  for (var m = l; m <= issue.labels.length-1; m++) { //checking for phase label
                    label = issue.labels[m]
                    
                    for (var j = sprint.numberOfColumns-1; j <= phases.length-1; j++) {
                      var phase = phases[j]; //a phase 
                        if(label.name === "Phase - " + "In Progress") {
                          issue.hasPhase = true;
                          issue.phase = "In Progress";
                          createCard(feature.phases[1], issue);
                          break;
                        }                      
                      if(label.name === "Phase - " + phase.name && issue.state === "open") {  
                        issue.hasPhase = true; 
                        issue.phase = phase.name;
                        createCard(feature.phases[j], issue);                
                        break;
                      }                
                    }

                    if(m === issue.labels.length-1) {
                      if(issue.state === "open" && issue.hasPhase !== true) {
                      issue.hasPhase = false;
                      issue.phase = ""; 
                      createCard(feature.phases[0], issue);                
                      }
                      if(issue.state === "closed") {
                      issue.hasPhase = false;     
                      issue.phase = "";  
                      createCard(feature.phases[2], issue);          
                      }
                    } 
                  }
                }
              }
            }
          }
      $scope.sprintBoard = BoardService.sprintBoard(sprint); 
    }

    function createCard(phase, issue) {
      phase.cards.push({"title": issue.title, //issue name
                        "details": issue.body, //issue body
                        "state": issue.state,
                        "number": issue.number,
                        "comments_number": issue.comments,
                        "assignee": issue.assignee,
                        "labels": issue.labels,
                        "hasPhase": issue.hasPhase,
                        "milestone": issue.milestone,
                        "feature": issue.feature,
                        "phase": issue.phase}); 
            //console.log("PHASECARDS", phase.cards)
      
                if(issue.status === "HELLO") {
          console.log("BOARD", issue)
    }


    }





});