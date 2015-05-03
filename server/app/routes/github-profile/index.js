'use strict'

var router = require('express').Router();
var GitHubApi=require('github');


module.exports = router;

	var github = new GitHubApi({
    // required
    version: "3.0.0"
    //optional
    // debug: true,
    // protocol: "https",
    // host: "api.github.com", // should be api.github.com for GitHub
    // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
    // timeout: 5000,
    // headers: {
    //     "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
    // }
	});

router.get('/username', function (req, res){
	
	var userGitHub = req.user.github.username;
		console.log("USER", userGitHub)

	

	github.user.getFrom({
		user: userGitHub
	}, function(err, userInfo) {
		console.log("GITHUB");
		console.log(userInfo);
		res.json(userInfo);
	});

	
});

