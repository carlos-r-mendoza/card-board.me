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
        {"name": "Closed"},
        {"name": "Milestone"}
      ],
      "features": [
        {"title": $stateParams.name, //label
          "details": "Feature 1",  //can delete
          "phases": [
            {"name": "Open", //Status Open
              "cards": [
                {"title": "", //issue name
                  "details": "Testing Card Details", //issue body
                  "status": "Open"}, //issue status
                {"title": "Get new resource for new Project",
                  "details": "Testing Card Details",
                  "status": "Open"}
              ]},
            {"name": "In Progress",
              "cards": [
                {"title": "Develop ui for tracker module",
                  "details": "Testing Card Details",
                  "status": "In progress"},
                {"title": "Develop backend for plan module",
                  "details": "Testing Card Details",
                  "status": "In progress"},
                {"title": "Test user module",
                  "details": "Testing Card Details",
                  "status": "In progress"}
              ]},
            {"name": "Closed",
              "cards": [
                {"title": "End to End Testing for user group module",
                  "details": "Testing Card Details",
                  "status": "Closed"},
                {"title": "CI for user module",
                  "details": "Testing Card Details",
                  "status": "Closed"}
              ]}
          ]
        },
        {
          "title": "Design new framework for reporting module",
          "details": "Feature 2",
          "phases": [
            {"name": "Open",
              "cards": [
                {"title": "Explore new Framework",
                  "details": "Testing Card Details",
                  "status": "Open"},
                {"title": "Get new Testing License",
                  "details": "Testing Card Details",
                  "status": "Open"}
              ]},
            {"name": "In progress",
              "cards": [
                {"title": "Develop ui using app",
                  "details": "Testing Card Details",
                  "status": "In progress"},
                {"tie": "Develop backend with NodeJS",
                  "details": "Testing Card Details",
                  "status": "In progress"}
              ]},
            {"name": "Closed",
              "cards": [
                {"title": "Explore High charts",
                  "details": "Testing Card Details",
                  "status": "Closed"}
              ]}
          ]
        }
      ]
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
      $scope.sprintBoard = BoardService.sprintBoard(sprint);  

      RepoFactory.getRepoIssues($stateParams).then(getIssuesWithFeatures, rejected);
    } 

    function populateFeaturesColumn(columnTitle) {
      sprint.features.push(
        {"title": columnTitle, //label
          "details": "Feature 1",  //can delete
          "phases": [
            {"name": "Open", //Status Open
              "cards": [
              ]},
            {"name": "In progress",
              "cards": [
              ]},
            {"name": "Closed",
              "cards": [
              ]}
          ]}
      );
    }

    function getIssuesWithFeatures(repoIssues) {

      sprint.features.forEach(function(feature) { //loop through each feature on sprint board
        repoIssues.data.forEach(function(issue){ //loop throough each issue
          issue.labels.forEach(function(label) { //loop through each label in issue
            if(label.name === "Feature - " + feature.title) {
              populatePhaseColumns(issue, feature);
            }
          });
        });
      }); 
            $scope.sprintBoard = BoardService.sprintBoard(sprint);  
    }

    // function populatePhaseColumns(issue, feature) {
    //   console.log("Inside phasecolpop-issue",issue); 
    //   issue.labels.forEach(function(label){
    //     var phaseName = label.name.split(" - ");

    //     if(phaseName[0] === "Phase") {
    //       createPhaseColumn(phaseName[1]);


                   



    //     } 
    //   })
    // }


    //   feature.phases.forEach(function(phase) {
    //     if(phase.name === "In progress" && issue.state === "open") {
    //         phase.cards.push({"title": issue.title, //issue name
    //         "details": issue.body, //issue body
    //         "status": "Open"});
    //     } else if(phase.name === "Open" && issue.state === "open") {
    //         phase.cards.push({"title": issue.title, //issue name
    //           "details": issue.body, //issue body
    //           "status": "Open"});
    //     } else if(phase.name === "Closed" && issue.state === "closed") {
    //         phase.cards.push({"title": issue.title, //issue name
    //           "details": issue.body, //issue body
    //           "status": "Open"});
    //     }
    //   }); 
    // }

    function createPhaseColumn(phase) {
      console.log("sprintfeatures",sprint.features.phases);
      console.log(phase);
      sprint.columns.push(
        {"name": phase});
    }
});