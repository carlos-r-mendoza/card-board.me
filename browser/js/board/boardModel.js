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
          this.phases = [];
          this.color = feature.feature_color;
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
    removeFeature: function(feature, board) {
      feature.phases.forEach(function(phase) {
        for(var i = 0; i < phase.cards.length; i++) {
          var card = phase.cards[i];  
          card.labelNames = [];
          if(card.assignee) { card.assignee_login = card.assignee.login; }
          card.labels.forEach(function(label){
            if(label.name) {
            card.labelNames.push(label.name);
            var labelName = label.name.split(" - "); 
              if(labelName[0] === "Phase" || labelName[0] === "Feature") {
                console.log("in", labelName[0])
                card.labels.splice(i, i+1);
                i-=1;
              }
            }
          }); 
          card.state = "closed";
          RepoFactory.editRepoIssue($stateParams, card.number, card);
        }
      });
      RepoFactory.deleteRepoMilestone($stateParams, feature.number).then(function(){
        board.features.forEach(function(featureBoard, index, array) {
          if(featureBoard.name === feature.name) {
            board.features.splice(index, index+1);
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
      //console.log("HELLO", phaseInfo)
      angular.forEach(board.features, function(feature){
        console.log("insideaddphasetoall phases", feature.phases);
        feature.phases.push(new BoardModel.Phase(phase));
      })
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
        console.log("fpbefore", feature.phases)
        feature.phases=feature.phases.filter(function(myphase){
          return myphase.name!==phase.name;
        })
        console.log("fpafter", feature.phases);
      })
      // board.features.forEach(function(feature){
      //   feature.phases.forEach(function(myphase){

      //   })
      
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
