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
      "numberOfColumns": 3,
      "columns": [
        {"name": "Open"},
        {"name": "In progress"},
        {"name": "Closed"}
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
            {"name": "In progress",
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


    var featureLabelsArr = [];

    RepoFactory.getRepoLabels($stateParams).then(getFeatures, rejected);

    function getFeatures(repoLabels) {
      featureLabelsArr = [];
      var featureLabels = repoLabels.data.forEach(function(label) {
        var featureSplit = label.name.split(" - ");
        if(featureSplit[0] === "Feature") {
          console.log("label_name", featureSplit[1]);
          featureLabelsArr.push(featureSplit[1]);


          sprint.features.push(
            {"title": featureSplit[1], //label
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
      });
            //$scope.sprintBoard = BoardService.sprintBoard(sprint);  

      RepoFactory.getRepoIssues($stateParams).then(getIssuesWithFeatures, rejected);
    } 


    function getIssuesWithFeatures(repoIssues) {
          repoIssues.data.forEach(function(issue){
            issue.labels.forEach(function(label){
              featureLabelsArr.forEach(function(featureLabel) {
                if(label.name === "Feature - " + featureLabel) {
                  sprint["features"][0].phases[0].cards.push({"title": issue.title, //issue name
                      "details": "Testing Card Details", //issue body
                      "status": "Open"})
                  }
              });
            });
          })
      $scope.sprintBoard = BoardService.sprintBoard(sprint);  
    }


});