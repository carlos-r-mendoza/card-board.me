'use strict';

var router = require('express').Router();
var github = require('../repo/gitHubAPI');

module.exports = router;

var errGitHub = function(err) {
	console.log("Error with GitHub API: ", err);
}

router.get('/username', function (req, res, next){
	console.log(req.user);
	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	console.log("ATEARER")
	github.authenticate({
    type: "oauth",
    token: userToken
	});

	github.user.getFrom({
		user: userGitHub
	}, function(err, userInfo) {
		if(err) { errGitHub(err); }
		res.json(userInfo);
	});



	
});

router.get('/collaborators', function (req, res){
	
	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
    type: "oauth",
    token: userToken
	});
	
	github.events.getFromUser({
		user: userGitHub
	}, function(err, userEvents) {
		if(err) { errGitHub(err); }
		res.send(userEvents);
	});

});

router.get('/repos', function (req, res){
	
	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
    type: "oauth",
    token: userToken
	});

	github.misc.rateLimit({}, function(err, limit){ console.log("LIMIT", limit);});
	
	github.repos.getFromUser({
		user: userGitHub,
		type: "all"
	}, function(err, userRepos) {
		if(err) { errGitHub(err); }
		res.json(userRepos);
	});
	
});


