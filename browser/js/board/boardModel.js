'use strict';
app.factory('BoardModel', function(){
    return{
      Board: function (name, numberOfColumns) {
          this.name = name;
          this.numberOfColumns = numberOfColumns;
          this.columns = [];
          this.features = [];
      },

      Column: function (column) {
          this.name = column.name;
          this.color = column.column_color;
          this.cards = [];
      },

      Feature: function (feature) {
          this.name = feature.title;
          this.title = feature.title;
          this.description = feature.description;
          this.due_date = feature.due_date;
          this.number = feature.number;
          this.feature_color = feature.feature_color;
          this.phases = feature.phases;
      },

      Phase: function (name) {
          this.name = name;
          this.cards = [];
      },

      Card: function (card) {
        this.title = card.title;
        this.details = card.details;
        this.state = card.state;
        this.number = card.number;
        this.creator = card.creator;
        this.feature = card.feature;
        this.phase = card.phase;
        this.assignee = card.assignee;
        this.assignee_avatar = card.assignee_avatar;
        this.comments_number = card.comments;
        this.labels = card.labels;
        this.milestone = card.milestone;
        this.dueDate = card.dueDate;
        this.created = card.created;
        this.updated = card.updated;
        this.closed = card.closed;
        return this;
      }
  };
});

app.factory('BoardManipulator', function (BoardModel, RepoFactory, $stateParams) {


  return {

    addColumn: function (board, column) {
      board.columns.push(new BoardModel.Column(column));
    },

    addCardToColumn: function (board, column, cardTitle, details) {
      angular.forEach(board.columns, function (col) {
        if (col.name === column.name) {
          col.cards.push(new BoardModel.Card(cardTitle, details, column.name));
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

    addFeature: function (board, feature) {

      board.features.push(new BoardModel.Feature(feature));
      // var label = {name: 'Feature - '+featureName, color: 'FFFFFF'};
      //Removed createRepoLabelss statement in line below. It attempts 
        //to create new labels each time page is refreshed
      // RepoFactory.createRepoLabel($stateParams, label);
    },
    addNewFeature: function(board, feature) {
      board.features.push(new BoardModel.Feature(feature.title));
      feature.title = "Feature - " + feature.title;
      RepoFactory.createRepoLabel($stateParams, feature);
      RepoFactory.createRepoMilestone($stateParams, feature);      
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
      var phaseInfo= {name: phaseName, color:'FFFFFF'};
      RepoFactory.createRepoLabel($stateParams, phaseInfo);
    },

    addCardToFeature: function (board, featureName, phaseName, card) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new BoardModel.Card(card));
            }
          });
        }
      });
    }
  };
});



