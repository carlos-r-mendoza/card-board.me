app.config(function ($stateProvider) {
    $stateProvider.state('board', {
        url: '/board',
        templateUrl: 'js/board/board.html',
        controller: 'SprintController'
    });
});

app.controller('SprintController', function ($scope, BoardService, BoardDataFactory, BoardManipulator, $rootScope) {

  $scope.sprintBoard = BoardService.sprintBoard(BoardDataFactory.sprint);

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

});