app.controller('NewCardController', function ($scope, $modal, $modalInstance, column) {

  function initScope(scope) {
    // scope.columnName = column.name;
    // scope.column = column;
    scope.title = '';
    scope.details = '';
  }

  $scope.animationsEnabled = true;

  $scope.addCard = function () {    
    console.log('inside add card');
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'newCard.html',
      controller: 'NewCardController',
      resolve:{
        newCard: function(){
        return {
          title: this.title, 
          column: column, 
          details: this.details
          }
        }
      }
    });

    modalInstance.result.then(function(item){
      $scope.selected = item;
    }, function(){
      console.log('working??');
    })
  };

  $scope.close = function () {
    $modalInstance.close();
  };

  $scope.cancel = function(){
    $modalInstance.dismiss('cancel');
  }

  $scope.addCard = function(){ console.log('TO ADD TO DB & BOARD');};

  initScope($scope);

});