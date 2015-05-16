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
  $scope.sprintBoard = "";

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
      var destinationPhase=event.dest.sortableScope.$parent.phase.name;
      var Phase=event.source.sortableScope.$parent.phase.name;
      var issueNum=event.source.itemScope.card.number;
      var featureName=event.source.itemScope.card.feature;
      var allLabels=event.source.itemScope.card;
      console.log("feature",featureName);
      console.log("labels",allLabels);
      if (destinationPhase==="Closed"){
        //console.log($stateParams);
        //console.log("WooHoo");
        RepoFactory.editRepoIssue($stateParams,issueNum,{state:"closed"});
      } 
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
      "collaborators": $scope.collab,
      "numberOfColumns": 3, //change this number to match number of hardcoded columns 
      "columns": [
        {"name": "Open"},
        {"name": "In Progress"},
        {"name": "Closed"}
      ],
      "features": []
    };


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
                    label = issue.labels[m];
                    
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
      //console.log('ISSUE STATE', issue.state);
      if(issue.milestone) { issue.due_date = issue.milestone.due_on; } else { issue.due_date = undefined; }
      phase.cards.push({
        "title": issue.title, //issue name
        "details": issue.body, //issue body
        "state": issue.state,
        "number": issue.number,
        "feature": issue.feature,
        "phase": issue.phase,
        "labels": issue.labels,
        "assignee": issue.assignee,
        "comments_number": issue.comments,
        "milestone": issue.milestone,
        "due_date": issue.due_date,
        "created_at": issue.created_at,
        "updated_at": issue.updated_at,
        "closed_at": issue.closed_at
      }); 
    }
});