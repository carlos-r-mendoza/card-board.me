app.controller('EditFeatureController', function($scope, $modal, BoardService, BoardManipulator, $rootScope, RepoFactory, $stateParams, ProgressFactory) {

    $scope.editFeature = function(board, currentFeature) {
        //console.log("CF", currentFeature);
        $scope.modalEdit = $modal.open({
            templateUrl: '/js/features/editFeature.html',
            backdrop: 'static',
            resolve: {
                sprintBoard: function() {
                    return board;
                },
                currentFeature: function() {
                    return currentFeature;
                }
            },
            controller: function($scope, $modalInstance, sprintBoard, currentFeature, $stateParams) {
                $scope.board = sprintBoard;
                currentFeature.due_date = new Date(currentFeature.due_date);
                $scope.editedFeature = {
                    title: currentFeature.title,
                    description: currentFeature.description,
                    dueDate: currentFeature.due_date,
                    number: currentFeature.number
                };
                $scope.close = function() {
                    $modalInstance.close();
                };

                $scope.ok = function(editedFeature) {
                    $scope.editedFeature.title = "Feature - " + $scope.editedFeature.title;
                    RepoFactory.updateRepoMilestone($stateParams, $scope.editedFeature);
                    if (currentFeature.name !== $scope.editedFeature.title.split(" - ")[1]) {
                        RepoFactory.deleteRepoLabel($stateParams, {
                            name: "Feature - " + currentFeature.name
                        });
                        RepoFactory.createRepoLabel($stateParams, $scope.editedFeature);
                    } else {
                        RepoFactory.editRepoLabel($stateParams, $scope.editedFeature);
                    }

                    board.features.forEach(function(feature) {
                        console.log("line57");
                        if (feature.name === currentFeature.name) {
                            feature.title = $scope.editedFeature.title.split(" - ")[1];
                            feature.name = $scope.editedFeature.title.split(" - ")[1];
                            feature.due_date = $scope.editedFeature.dueDate;
                            feature.description = $scope.editedFeature.description;
                            feature.color = $scope.editedFeature.color;
                            feature.phases.forEach(function(phase) {
                                phase.cards.forEach(function(card) {
                                    card.dueDate = $scope.editedFeature.dueDate;
                                    card.feature = $scope.editedFeature.title.split(" - ")[1];
                                    card.milestone = $scope.editedFeature.title;
                                    card.labels.forEach(function(label) {
                                        if (label.name.split(" - ")[0] === "Feature") {
                                            label.name = $scope.editedFeature.title;
                                            label.color = $scope.editedFeature.color;
                                        }

                                    });
                                    var currentLabelNames = _.pluck(card.labels, 'name');
                                    console.log("labelnames",currentLabelNames)
                                    setTimeout(function(){
                                        RepoFactory.editRepoIssue($stateParams, card.number,{labelNames:currentLabelNames});
                                    },2000);

                                });
                            });
                            // }
                        }
                    });
                    $modalInstance.close();
                };

            }
        });
    };
    $scope.removeFeature = function(feature, board) {
                    BoardManipulator.removeFeature(feature, board);
                };
});