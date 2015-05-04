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

	github.user.getFrom({
		user: userGitHub
	}, function(err, userInfo) {
		res.json(userInfo);
	});



	
});

// router.get('/collaborators', function (req, res){
	
// 	var userGitHub = req.user.github.username;
// 	var userToken = req.user.github.token;

// 	github.authenticate({
//     type: "oauth",
//     token: userToken
// 	});
	
// 	github.events.getFromUser({
// 		user: userGitHub
// 	}, function(err, userEvents) {
// 		res.send(userEvents);
// 	});

// });

router.get('/repos', function (req, res){
	
	var userGitHub = req.user.github.username;
	var userToken = req.user.github.token;

	github.authenticate({
    type: "oauth",
    token: userToken
	});

	github.misc.rateLimit({}, function(err, limit){ console.log("LIMIT", limit);});
	
	github.repos.getFromUser({
		user: userGitHub
	}, function(err, userRepos) {


		console.log(userRepos[0].name);
		//res.send(userRepos);
		
		userRepos.map(function(repo, index){



			var repoName = repo.name;
			repo.collaborators = [];

			console.log(repoName);

			github.repos.getCollaborators({
			
			user: userGitHub,
			repo: repoName
			
			}, function(err, repoCollaborators) {
				var collaboratorsUserName = [];
				//console.log("Collabs", repoCollaborators);

				repoCollaborators.map(function(collaborator){
					repo.collaborators.push(collaborator.login);
					//console.log("Collabs", collaborator.login);
			
					if(index === userRepos.length-1) {
					console.log(req.headers);
					res.json(userRepos);
			//res.send(collaborators);
					}

				});

			
			
			});
		

		});




	});
	
});


// router.get('/repos/collaborators', function (req, res){
	
// 	var userGitHub = req.user.github.username;
// 	var userToken = req.user.github.token;

// 	github.authenticate({
//     type: "oauth",
//     token: userToken
// 	});
	
// 	github.repos.getCollaborators({
// 		user: userGitHub,
// 		repo: "project_management_tool"
// 	}, function(err, collaborators) {
// 		res.send(collaborators);
// 	});
	
// });


