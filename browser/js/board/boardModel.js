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
        console.log("ASD", title);
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
                  card.status = newTask.status;
                  card.comments = newTask.comments;
                  card.assignee = newTask.assignee;
                  card.labels = newTask.labels;
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
          console.log('EDIT FEATURE TITLE: ', editFeature);
          console.log('FEATURE.NAME: ' , feature.name);
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
              phase.cards.push(new BoardModel.Card(task.title, task.details, task.status, task.comments, task.assignee, task.label, task.dueDate));
            }
          });
        }
      });
    }
  };
});



