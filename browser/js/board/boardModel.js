'use strict';
app.factory('BoardModel', function(){
    return{
      Board: function (name, numberOfColumns) {
          this.name = name;
          this.numberOfColumns = numberOfColumns;
          this.columns = [];
          this.features = [];
      },

      Column: function (name) {
          this.name = name;
          this.cards = [];
      },

      Feature: function (name) {
          this.name = name;
          this.phases = [];
      },

      Phase: function (name) {
          this.name = name;
          this.cards = [];
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
  };
});

app.factory('BoardManipulator', function (BoardModel, RepoFactory, $stateParams) {


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
    removeCardFromColumn: function (board, featureName, phaseName, task) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              console.log("phase.cards", phase.cards);
              phase.cards.splice(phase.cards.indexOf(task), 1);
            }
          });
        }
      });
    },

    editCard: function(board, featureName, phaseName, currentTask, newTask){
      angular.forEach(board.features, function(feature){
        if(feature.name ===featureName){
          angular.forEach(feature.phases, function(phase){
            if(phase.name === phase.name){
              angular.forEach(phase.cards, function(card){
                if(card.title === currentTask.title){
                  card.title = newTask.title;
                  card.details = newTask.details;
                  card.state = newTask.state;
                  card.number = currentTask.number;
                  card.comments = newTask.comments;
                  card.assignee = newTask.assignee;
                  card.labels = newTask.labels;
                  card.feature = newTask.feature;
                  card.phase = newTask.phase;
                }
              });    
            }            
          });
        }
      });
    },

    addFeature: function (board, featureName) {
      board.features.push(new BoardModel.Feature(featureName));
      var label = {name: 'Feature - '+featureName, color: 'FFFFFF'};
      RepoFactory.createRepoLabel($stateParams, label);
    },

    editFeature: function(board, currentFeature, editFeature){
      angular.forEach(board.features, function(feature){
        if(feature.name === currentFeature){
          feature.name = editFeature;
        }
      });
    },

    addPhaseToFeature: function (board, featureName, phase) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          feature.phases.push(new BoardModel.Phase(phase.name));
        }
      });
    },

    addPhaseToAll: function (board, phase) {
      board.columns.push(new BoardModel.Phase(phase));
      var phaseName = "Phase - " + phase;
      var phaseInfo={name: phaseName, color:'FFFFFF'};
      RepoFactory.createRepoLabel($stateParams,phaseInfo);
    },

    addCardToFeature: function (board, featureName, phaseName, task) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new BoardModel.Card(task.title, task.details, task.state, task.number, task.comments, task.assignee, task.labels, task.feature, task.phase));
            }
          });
        }
      });
    }
  };
});



