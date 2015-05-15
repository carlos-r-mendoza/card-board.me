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

    RepoFactory.getRepoLabels($stateParams).then(getLabelFeatures, rejected);

    function getLabelFeatures(repoLabels) {
      repoLabels.data.forEach(function(label) {
        var labelName = label.name.split(" - ");
        console.log("LAB", labelName[0])
         if(labelName[0] === "Feature") {
          populateFeaturesColumn(labelName[1]);
        }  
        if (labelName[0] === "Phase" && labelName[1] !== "In Progress") {
          console.log("HERE", labelName[1])
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
      repoIssues.data.forEach(function(issue) {
      if(issue.labels.length > 0) {
        issue.labels.sort();
        for (var i = 0; i <= issue.labels.length-1; i++) {
          sprint.features.forEach(function(feature) {
            if(issue.labels[i].name === "Feature - " + feature.title) {
                for (var j = sprint.numberOfColumns; j <= feature.phases.length-1; j++) {
                  for (var k = i; k <= issue.labels.length-1; k++) {
                    if(issue.labels[k].name === "Phase - " + "In Progress") {
                     feature.phases[1].cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"});
                      break;
                    }
                    if(issue.labels[k].name === "Phase - " + feature.phases[j].name) {                   
                     feature.phases[j].cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"});
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
              }
            }
          });
        }
      }
    });
    $scope.sprintBoard = BoardService.sprintBoard(sprint); 
  } 
});