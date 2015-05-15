// module('FullstackGeneratedApp', ['ui.router', 'fsaPreBuilt', 'chart.js', 'ui.sortable', 'ui.bootstrap']);

// describe('Board Factory', function(){
	
// 	beforeEach(module('FullstackGeneratedApp'));
// 	var board;
// 	beforeEach(inject(function(BoardModel){
// 		board = new BoardModel();
// 	}));

// 	it('creates a new board', function(){
// 		expect(board.Board(boardName)).toEqual('boardName');
// 	});

// 	it('creates a new column', function(){
// 		expect(board.column(columnName).toEqual('columnName'));
// 	});
// });

// describe('SprintController', function(){
// 	beforeEach(module('FullstackGeneratedApp'));

// 	var $controller;
// 	beforeEach(inject(function($controller, $rootScope){
// 		$scope = $rootScope.new();
// 		Controller = $controller('SprintController', {$scope: $scope});
// 	}));

// 	describe('$scope.addNewCard', function(){
// 		it('adds a new card on the board', function(){
// 			expect($scope.addNewCard).toEqual(BoardService.addNewCard);
// 		});
// 	});
// 	describe('$scope.addNewFeature', function(){
// 		it('adds a new feature to the board', function(){
// 			expect($scope.addNewFeature).toEqual(BoardService.addNewFeature);
// 		});
// 	});
// 	describe('$scope.removeCard', function(){
// 		it('removes a card from the board', function(){
// 			expect($scope.removeCard).toEqual(BoardService.removeCard);
// 		});
// 	});
// });