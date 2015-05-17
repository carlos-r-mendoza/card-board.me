app.factory('BoardService', function ($modal, BoardManipulator, BoardModel) {

  return {
    removeCard: function (board, feature, phase, card) {
      console.log("board: ", board);
      //console.log("column: ", column);
      console.log('card: ', card);
      
        BoardManipulator.removeCardFromColumn(board, feature, phase, card);
      
    },

    addNewCard: function (board, column, featureName, featureInfo) {
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
          },
          featureInfo: function () {
            return featureInfo;
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
        BoardManipulator.addFeature(sprintBoard, feature);
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

