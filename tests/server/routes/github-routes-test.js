var supertest = require('supertest');
var app = require('../../../server/app');
var agent = supertest.agent(app);


describe('http requests', function() {

	describe('GET /', function() {

		it('shoutl get 200 on index', function(done){
			agent.get('/').expect(200, done);
		});

	});
});