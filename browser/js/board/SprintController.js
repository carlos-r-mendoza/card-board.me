//var _=require('lodash');

app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board/:owner/:name',
        templateUrl: 'js/board/board.html',
        controller: 'SprintController'
    });
});

app.controller('SprintController', function ($scope, $stateParams, BoardService, BoardManipulator, $rootScope, RepoFactory) {

  //$scope.sprintBoard = ""; 
  // $scope.table = { 
  //   width: 0 };
  $scope.isCollapsed = false;
  //$scope.sprintBoard = "";

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
      function phaseFilter(label){
          return label.name.split(" - ")[0]!=="Phase";
      }

      var destinationPhase=event.dest.sortableScope.$parent.phase.name;
      var sourcePhase=event.source.sortableScope.$parent.phase.name;
      var issueNum=event.source.itemScope.card.number;
      var allLabels=event.source.itemScope.card.labels;
      var filteredArray=allLabels.filter(phaseFilter);
      if (destinationPhase==="Closed"){
        RepoFactory.editRepoIssue($stateParams,issueNum,{state:"closed", labels:filteredArray});
      } else if (destinationPhase==="Open"&&sourcePhase==="Closed"){
        RepoFactory.editRepoIssue($stateParams,issueNum,{state:"open"});
      } else if (sourcePhase==="Closed"){
        var currentLabelNames=_.pluck(allLabels, 'name');
        RepoFactory.editRepoIssue($stateParams,issueNum,{state:"open", labels:currentLabelNames});
      } else if (destinationPhase==="Open"){
        RepoFactory.editRepoIssue($stateParams,issueNum,{labels:filteredArray});
      } else {
        var currentLabelNames=_.pluck(filteredArray, 'name');
        currentLabelNames.push("Phase - "+destinationPhase);
        RepoFactory.editRepoIssue($stateParams,issueNum,{labels:currentLabelNames});
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
        {"name": "Open", "column_color": ""},
        {"name": "In Progress", "column_color": ""},
        {"name": "Closed", "column_color": ""}
      ],
      "features": []
    };


    
    RepoFactory.getRepoMilestones($stateParams).then(getFeatures, rejected);
    
    function getFeatures(repoMilestones) {
      repoMilestones.data.forEach(function(milestone) {
        var featureName = milestone.title.split(" - ");
        if(featureName[0] === "Feature") { populateFeaturesColumn(featureName[1], milestone); } 
      });
      RepoFactory.getRepoLabels($stateParams).then(getPhases, rejected);
    }

    function getPhases(repoLabels) {
      repoLabels.data.forEach(function(label) {
        var labelName = label.name.split(" - ");
        if (labelName[0] === "Phase" && labelName[1] !== "In Progress") {
          createPhaseColumn(labelName[1], label.color);
        }
        if (labelName[0] === "Feature") {
          addFeatureColor(labelName[1], label.color);
          console.log("LABEL", label)
        }
      });
      addPhasesToFeatures();
      RepoFactory.getRepoIssues($stateParams).then(addIssuesToPhases, rejected);
    } 

    function populateFeaturesColumn(featureName, feature) {
      sprint.features.push(
        {"title": featureName, //rows
          "description": feature.description,
          "due_date": feature.due_on,
          "number": feature.number,
          "feature_color": "",
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

    function addFeatureColor(featureName, color) {
      sprint.features.forEach(function(feature) {

        if(feature.title === featureName) {
          feature.feature_color = color;

        }
      });
    }

    function createPhaseColumn(phase, color) {
      sprint.columns.push(
        {"name": phase,
          "column_color": color});
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
      // $scope.table = {
      //   width: 24 + ( sprint.columns.length * 18 ),
      //   column_width: 15
      // }
      $scope.sprintBoard = BoardService.sprintBoard(sprint); 
    }

    function createCard(phase, issue) {

      if(issue.milestone) { issue.due_date = issue.milestone.due_on; } else { issue.due_date = undefined; }
      if(issue.assignee) { issue.assignee_avatar = issue.assignee.avatar_url } else { issue.assignee_avatar = undefined; }

      phase.cards.push({
        "title": issue.title, //issue name
        "details": issue.body, //issue body
        "state": issue.state,
        "number": issue.number,
        "creator": issue.user.login,
        "feature": issue.feature,
        "phase": issue.phase,
        "labels": issue.labels,
        "assignee": issue.assignee,
        "assignee_avatar": issue.assignee_avatar,
        "comments_number": issue.comments,
        "milestone": issue.milestone,
        "dueDate": issue.due_date,
        "created": issue.created_at,
        "updated": issue.updated_at,
        "closed": issue.closed_at,
      });

    }
});