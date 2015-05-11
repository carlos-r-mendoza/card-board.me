'use strict';
app.factory('BoardModel', function(){
    return{
        Board: function (name, numberOfColumns) {
        return {
          name: name,
          numberOfColumns: numberOfColumns,
          columns: [],
          features: []
        };
      },

      Column: function (name) {
        return {
          name: name,
          cards: []
        };
      },

      Feature: function (name) {
        return {
          name: name,
          phases: []
        };
      },

      Phase: function (name) {
        return {
          name: name,
          cards: []
        };
      },
      
      Card: function (title, status, details, assignee, label, dueDate) {
        this.title = title;
        this.status = status;
        this.details = details;
        this.assignee = assignee;
        this.label = label;
        this.dueDate = dueDate;
        return this;
      }
  }
});


app.factory('BoardDataFactory', function () {
//THIS SHOULD BE MONGO DB GET REQUEST: $scope.sprintBoard = getBoard();
  return {
    sprint: {
      "name": "Sprint Board",
      "numberOfColumns": 3,
      "columns": [
        {"name": "Open"},
        {"name": "In progress"},
        {"name": "Closed"}
      ],
      "features": [
        {"title": "Come up with a POC for new Project",
          "details": "Feature 1",
          "phases": [
            {"name": "Open",
              "cards": [
                {"title": "Explore new IDE for Development",
                  "details": "Testing Card Details",
                  "status": "Open"},
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
                {"title": "Develop backend with NodeJS",
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
  };
});

app.factory('BoardManipulator', function (BoardModel) {


  return {

    addColumn: function (board, columnName) {
      board.columns.push(new BoardModel.Column(columnName));
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.push(new BoardModel.Card(cardTitle, column.name, details));
        }
      });
    },
    removeCardFromColumn: function (board, column, card) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.splice(col.cards.indexOf(card), 1);
        }
      });
    },
    addFeature: function (board, featureName) {
      board.features.push(new BoardModel.Feature(featureName));
    },

    addPhaseToFeature: function (board, featureName, phase) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          feature.phases.push(new BoardModel.Phase(phase.name));
        }
      });
    },

    addCardToFeature: function (board, featureName, phaseName, task) {
      console.log('BOARD: ', board);
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new BoardModel.Card(task.title, task.details, task.status, task.comments, task.assignee, task.label, task.dueDate));
            }
          });
        }
      });
    }
  };
});



