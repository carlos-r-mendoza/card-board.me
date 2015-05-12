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
  RepoFactory.getRepoIssues($stateParams).then(repoIssuesFulfilled, rejected);
console.log("Issues", Issues);


var Issues;
console.log("STATE", $stateParams.name);
  function repoIssuesFulfilled(repoIssues) {
    Issues = repoIssues.data;
    console.log("repoissues", repoIssues.data);
    //$scope.repoIssues.forEach(function(issue){

    sprint["features"]["cards"].pus
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
    }
      $scope.sprintBoard = BoardService.sprintBoard(sprint);
}

});