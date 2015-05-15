var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('http requests', function() {

	describe('GET /', function() {

		it('shoutl get 200 on index', function(done){
			agent.get('/').expect(200, done);
		});

	});

	describe('GET repo/:repoOwner/:repoName', function() {
		xit('should get 200 on page that does exist', function() {
			agent.get('/repo/carlos-r-mendoza/project_management_tool').expect(200, done);
		})
	})

	describe('GET repo/:repoOwner/:repoName/collaborators', function() {
		xit('should get 200 on page that does exist', function() {
			agent.get('/repo/carlos-r-mendoza/project_management_tool/collaborators').expect(200, done);
		})
	})

});