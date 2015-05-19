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

      Feature: function (feature) {
          this.name = feature.title;
          this.title = feature.title;
          this.description = feature.description;
          this.due_date = feature.due_date;
          this.number = feature.number;
          this.phases = [];
      },

      Phase: function (name) {
          this.name = name;
          this.cards = [];
      },
      
      Card: function (title, details, state, number, feature, phase, labels, assignee, comments, milestone, dueDate) {
        this.title = title;
        this.details = details;
        this.state = state;
        this.number = number;
        this.assignee = assignee;
        this.labels = labels;
        this.milestone = dueDate;
        this.feature = feature;
        this.phase = phase;
        this.comments = comments;
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
      console.log("HELLO", phaseInfo)
      RepoFactory.createRepoLabel($stateParams, phaseInfo);
    },

    addCardToFeature: function (board, featureName, phaseName, task) {
      angular.forEach(board.features, function (feature) {
        if (feature.name === featureName) {
          angular.forEach(feature.phases, function (phase) {
            if (phase.name === phaseName) {
              phase.cards.push(new BoardModel.Card(task.title, task.details, task.state, task.number, task.feature, task.phase, task.labels, task.assignee, task.comments, task.milestone, task.dueDate));
            }
          });
        }
      });
    },
    removePhase: function(board,phase){
      board.features.forEach(function(feature){
        feature.phases.forEach(function(myphase){
          if (myphase.name===phase.name){
            myphase.cards.forEach(function(card){
              RepoFactory.editRepoIssue($stateParams,card.number,{state:"closed"});
            })
          }
        })
      })
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
              })
              }

            })
            thisphase.cards=[];
          }
        })
      })
      console.log("tphase", transferphase);
      board.features.forEach(function(feature){
        feature.phases.forEach(function(newphase){
          if (newphase.name==="Closed"){
            console.log("nphase",newphase);
            newphase=newphase.cards.concat(transferphase);
          }
        })
      })
      phase.name="Phase - "+phase.name;
      RepoFactory.deleteRepoLabel($stateParams,phase);
    }
  };
});



