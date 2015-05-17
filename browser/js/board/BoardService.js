app.factory('BoardService', function ($modal, BoardManipulator, BoardModel, RepoFactory, $stateParams) {

  return {
    removeCard: function (board, feature, phase, card) {        
        console.log('CARD: ', card);
        var editedIssue = {
          title: card.title,
          body: 'removed issue',
          state: 'closed',
          labels: []
        };
        RepoFactory.editRepoIssue($stateParams, card.number, editedIssue);
        BoardManipulator.removeCardFromColumn(board, feature, phase, card);      
    },

    addNewCard: function (board, column, featureName) {
      var modalInstance = $modal.open({
        templateUrl: '/js/board/newCard.html',
        controller: 'NewCardController',
        backdrop: 'static',
        resolve: {
          sprintBoard: function(){
            return board;
          },
          featureName: function () {
            return featureName;
          }
        }
      });
      modalInstance.result.then(function (cardDetails) {
        if (cardDetails) {
          BoardManipulator.addCardToColumn(board, cardDetails.column, cardDetails.title, cardDetails.details);
        }
      });
    },

    sprintBoard: function (board) {
      //console.log("board", board)
      var sprintBoard = new BoardModel.Board(board.name, board.numberOfColumns);
      angular.forEach(board.columns, function (column) {
        BoardManipulator.addColumn(sprintBoard, column.name);
      });
      angular.forEach(board.features, function (feature) {
        BoardManipulator.addFeature(sprintBoard, feature.title);
        angular.forEach(feature.phases, function (phase) {
          BoardManipulator.addPhaseToFeature(sprintBoard, feature.title, phase);
          angular.forEach(phase.cards, function (card) {
            BoardManipulator.addCardToFeature(sprintBoard, feature.title, phase.name, card);
          });
        });

      });
      return sprintBoard;
    }
  };
});

