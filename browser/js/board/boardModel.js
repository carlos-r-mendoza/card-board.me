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

      Feature: function (feature, color, featureTitle, featurePhases) {

        if(feature.due_on) { feature.due_date = feature.due_on; }
        if(feature.color) { feature.feature_color = feature.color;  }
        if(color) { feature.feature_color = color; }
        if(featureTitle) { feature.title = featureTitle; }
        if(featurePhases) { this.phases = featurePhases; } else { this.phases = []; }
        this.name = feature.title;
        this.title = feature.title;
        this.description = feature.description;
        this.due_date = feature.due_date;
        this.number = feature.number;
        this.color = feature.feature_color;
      },

      Phase: function (name) {
          this.name = name;
          this.cards = [];
      },
      
      Card: function (card, featureName, phaseName) {
        if(card.body) { card.details = card.body; }
        if(card.user) { card.creator = card.user.login; }
        if(featureName) { card.feature = featureName; }
        if(phaseName) { card.phase = phaseName; }
        if(typeof card.assignee === 'object' && card.assignee !== null) {  card.assignee_avatar = card.assignee.avatar_url; card.assignee = card.assignee.login; }
        if(typeof card.milestone === 'object' && card.milestone !== null) { card.dueDate = card.milestone.created_at; card.milestone = card.milestone.title; }
        if(card.created_at) { card.created = card.created_at; }
        if(card.updated_at) { card.updated = card.updated; }
        if(card.closed_at) { card.closed = card.closed_at; }

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

app.factory('BoardManipulator', function (BoardModel, RepoFactory, $stateParams, ProgressFactory) {


  return {

    addColumn: function (board, columnName) {
      board.columns.push(new BoardModel.Column(columnName));
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
              phase.cards.splice(phase.cards.indexOf(task), 1);
            }
          });
        }
      });
    },
    removeFeature: function(feature, board) {
      feature.phases.forEach(function(phase) {
        phase.cards.forEach(function(card){
          card.labels = card.labels.filter(function(label){
            var labelName = label.name.split(" - "); 
            return labelName[0]!=="Phase" && labelName[0] !== "Feature";
          });
          if(card.assignee) { card.assignee_login = card.assignee.login; }
          card.state = "closed";
          RepoFactory.editRepoIssue($stateParams, card.number, card);
          phase.cards=[];
        });
        ProgressFactory.updateBar(board);
        RepoFactory.deleteRepoMilestone($stateParams, feature.number).then(function(){
          for (var i = 0; i < board.features.length; i++) {
            if(board.features[i].name === feature.name) {
              board.features.splice(i, 1);
              i-=1;
            }
          }
        });
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
    },
    addNewFeature: function(board, feature) {
      var featureTitle = feature.title;
      var phase;

      var splitTitle = feature.title.split(" - ");
      if(splitTitle[0] !== "Feature") { feature.title = "Feature - " + feature.title; }


      RepoFactory.createRepoLabel($stateParams, feature);
      RepoFactory.createRepoMilestone($stateParams, feature).then(function (featureCreated) {
        feature.phases = [];
              
              board.columns.forEach(function(column){
                feature.phases.push({name: column.name, cards: []});
              });
              console.log("fc",featureCreated);
              board.features.push(new BoardModel.Feature(featureCreated.data, feature.color, featureTitle, feature.phases));
      });      
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
      // board.numberOfColumns++;
      var phaseName = "Phase - " + phase;
      var phaseInfo= {name: phaseName, color:'FFFFFF'};
      angular.forEach(board.features, function(feature){
        feature.phases.push(new BoardModel.Phase(phase));
      });
      RepoFactory.createRepoLabel($stateParams, phaseInfo);
    },
    
    addCardToFeature: function (board, featureName, phaseName, card) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          //feature.phases = [{name: "Open", cards: []}];
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new BoardModel.Card(card, featureName, phaseName));
            }
          });
        }
      });
      ProgressFactory.updateBar(board);
    },
    removePhase: function(board,phase){
      
      board.columns=board.columns.filter(function(column){
        return column.name!==phase.name;
      });
      var transferphase;
      board.features.forEach(function(feature){
        var currentfeature=feature.name;
        feature.phases.forEach(function(thisphase){
          if (thisphase.name===phase.name){
            transferphase=_.clone(thisphase.cards,true);
            board.features.forEach(function(feature){
              if (feature.name===currentfeature){
                feature.phases.forEach(function(allphase){
                  if (allphase.name==="Closed"){
                    allphase.cards=allphase.cards.concat(transferphase);
                }
              });
              }
            });
            thisphase.cards=[];
          }
        });
        feature.phases=feature.phases.filter(function(myphase){
          return myphase.name!==phase.name;
        });
      }); 
      board.features.forEach(function(feature){
        feature.phases.forEach(function(newphase){
          if (newphase.name==="Closed"){
            newphase=newphase.cards.concat(transferphase);
          }
        });
      }); 
      phase.name="Phase - "+phase.name;
      RepoFactory.deleteRepoLabel($stateParams,phase);
      ProgressFactory.updateBar(board);
  }
};
});
